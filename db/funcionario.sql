-- FUNCIONARIO --
CREATE TABLE Funcionario (
FKId				INT UNSIGNED PRIMARY KEY    ,
Nome 			    VARCHAR		(146)			,
Cpf         	    CHAR		(011)			,
DataNascimento  	DATE        				,
CONSTRAINT FKFuncionario_Login FOREIGN KEY(FKId) REFERENCES Login(Id) ON DELETE CASCADE
);

DELIMITER $$ 
DROP PROCEDURE IF EXISTS PRC_IncluirFuncionario $$
CREATE PROCEDURE PRC_IncluirFuncionario
(
	IN  pId				 	 INT 
,	IN  pNome 				 VARCHAR (030)
, 	IN  pCpf             	 CHAR	 (011)
,	IN  pDataNascimento    	 DATE
)
main: BEGIN 

	INSERT INTO 
		Funcionario
	(
		FKId
	, 	Nome
    , 	Cpf
    ,	DataNascimento
    ) 
	VALUES
    (
		pId
	, 	pNome
    , 	pCpf
    ,	pDataNascimento
    );
        
END
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_ListarFuncionarios $$
CREATE PROCEDURE 			PRC_ListarFuncionarios()
main: BEGIN 

	SELECT
			l.Id
	,		l.Email
	,		t.Numero
	,		f.Nome
    
	FROM 
			Funcionario AS f
	INNER JOIN
			Login AS l
	ON
			l.Id = f.FKId
	INNER JOIN
			Telefone AS t
	ON
			l.Id = t.FKId
		AND	t.Principal = TRUE;

END
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_DetalharFuncionario$$
CREATE PROCEDURE 			PRC_DetalharFuncionario
(
	IN pId 	   INT    
)
main: BEGIN 

	SELECT 
			l.Id
	,		l.Email
	,		l.Tipo
	,		t.CounterTelefone as TelefoneId
	,		t.Numero as NumeroTelefone
	,		f.Nome
	,		f.Cpf
	,		f.DataNascimento
	,		e.CounterEndereco as EnderecoId
	,		e.Logradouro
	,		e.Numero
	,		e.Complemento
	,		e.Cidade
	,		e.Estado
	,		e.CEP
	FROM 
		Funcionario AS f
	INNER JOIN
		Login		AS l
	ON
		l.Id		=	f.FKId
	INNER JOIN
		Endereco	AS e
	ON
		l.Id		= e.FKId
	AND 
		e.Principal = TRUE
	INNER JOIN
		Telefone	AS t
	ON
		l.Id		= t.FKId
	AND 
		t.Principal = TRUE
	WHERE 
		f.FKId	=	pId;

END
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_EditarFuncionario $$
CREATE PROCEDURE 			PRC_EditarFuncionario
(
	IN  pId				 	 INT 
,	IN  pNome 				 VARCHAR (030)
, 	IN  pCpf             	 CHAR	 (011)
,	IN  pDataNascimento    	 DATE
)
main: BEGIN 

	UPDATE 		
		Funcionario
	SET
	 	Nome 			= pNome
    , 	Cpf 			= pCpf
    ,	DataNascimento 	= pDataNascimento
    WHERE 
		FKId =	pId;
        
END
$$ DELIMITER ;