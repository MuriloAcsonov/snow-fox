-- ENDERECO --
CREATE TABLE Endereco (
FKId				        INT UNSIGNED NOT NULL                   ,
CounterEndereco     INT UNSIGNED NOT NULL                   ,
Logradouro     	    VARCHAR		  (180)			                  ,
Numero            	CHAR        (005)                       ,
Complemento         VARCHAR     (150)                       ,
Cidade              VARCHAR     (100)                       ,
Estado              CHAR        (002)                       ,
CEP                 CHAR        (008)                       ,
Principal           BOOLEAN DEFAULT FALSE                   ,
PRIMARY KEY (FKId, CounterEndereco)                         ,
UNIQUE KEY  (FKId, CEP)                                     ,
CONSTRAINT FKEndereco_Login FOREIGN KEY(FKId) REFERENCES Login(Id) ON DELETE CASCADE
);

DELIMITER $$ 
DROP PROCEDURE IF EXISTS PRC_IncluirEndereco $$
CREATE PROCEDURE PRC_IncluirEndereco
(
	  IN  pId           INT 
,	  IN  pLogradouro   VARCHAR(180)
, 	IN  pNumero 	    CHAR(005)
, 	IN  pComplemento  VARCHAR(150)
,	  IN  pCidade 	    VARCHAR(100)
,   IN  pEstado 	    CHAR(002)
,   IN  pCEP 	        CHAR(008)
,   IN  pPrincipal    BOOLEAN
)
main: BEGIN

  DECLARE mCounter INT;

  SELECT 
    COUNT(FKId) INTO mCounter
  FROM
    Endereco
  WHERE
    FKId  = pId;

	INSERT INTO 
		Endereco
	(
		  FKId
    , CounterEndereco
	  ,	Logradouro
    ,	Numero
    ,	Complemento
    ,	Cidade
    ,	Estado
    ,	CEP
    , Principal
  ) 
	VALUES
  (
	    pId
    , (mCounter + 1)
	  ,	pLogradouro
    ,	pNumero
    ,	pComplemento
    ,	pCidade
    ,	pEstado
    ,	pCEP
    , pPrincipal
  );

  IF pPrincipal = TRUE THEN
		UPDATE
			Endereco
		SET
			Principal	= FALSE
		WHERE
			FKId			= pId
		AND
			CounterEndereco	<> (mCounter + 1);
	END IF;
    
    
END
$$ DELIMITER ;


DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_ListarEnderecoId$$
CREATE PROCEDURE 			PRC_ListarEnderecoId
(
	IN pId 	   INT    
)
main: BEGIN 

	SELECT 
		  FKId
    , CounterEndereco
	  ,	Logradouro
    ,	Numero
    ,	Complemento
    ,	Cidade
    ,	Estado
    ,	CEP
    , Principal
	FROM 
		Endereco
	WHERE 
		FKId	=	pId;

END
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_DetalharEndereco$$
CREATE PROCEDURE 			    PRC_DetalharEndereco
(
	IN  pId 	            INT
, IN  pCounterEndereco  INT
)
main: BEGIN 

	SELECT 
		  FKId
    , CounterEndereco
	  ,	Logradouro
    ,	Numero
    ,	Complemento
    ,	Cidade
    ,	Estado
    ,	CEP
    , Principal
	FROM 
		Endereco
	WHERE 
		FKId	          = pId
  AND     
    CounterEndereco = pCounterEndereco;

END
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_EditarEndereco $$
CREATE PROCEDURE 			    PRC_EditarEndereco
(
	  IN  pId                 INT
,   IN  pCounterEndereco    INT
,	  IN  pLogradouro         VARCHAR(180)
, 	IN  pNumero 	          CHAR(005)
, 	IN  pComplemento        VARCHAR(150)
,	  IN  pCidade 	          VARCHAR(100)
,   IN  pEstado 	          CHAR(002)
,   IN  pCEP 	              CHAR(008)
,   IN  pPrincipal          BOOLEAN
)
main: BEGIN 

	UPDATE 		
		Endereco
	SET
	 	  Logradouro  = pLogradouro
    , Numero      = pNumero
    ,	Complemento = pComplemento
    , Cidade      = pCidade
    , Estado      = pEstado
    , CEP         = pCEP
    , Principal   = pPrincipal
  WHERE 
		  FKId            =   pId
  AND 
      CounterEndereco =   pCounterEndereco;

  IF pPrincipal = TRUE THEN
		UPDATE
			Endereco
		SET
			Principal	= FALSE
		WHERE
			FKId			= pId
		AND
			CounterEndereco	<> pCounterEndereco;
	END IF;

        
END
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_DeletarEndereco $$
CREATE PROCEDURE 			    PRC_DeletarEndereco
(
	IN  pId                 INT
, IN  pCounterEndereco    INT
)
main: BEGIN 

	DELETE FROM
		Endereco
  WHERE 
		Id = pId
  AND
    CounterEndereco = pCounterEndereco
  AND
    Principal       <> TRUE;
	
END
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_EnderecoPrincipal$$
CREATE PROCEDURE 			    PRC_EnderecoPrincipal
(
	IN  pId INT
)
main: BEGIN 

	SELECT 
		  FKId
    , CounterEndereco
	  ,	Logradouro
    ,	Numero
    ,	Complemento
    ,	Cidade
    ,	Estado
    ,	CEP
    , Principal
	FROM 
		Endereco
	WHERE 
		FKId	    =   pId
  AND
    Principal =   TRUE;

END
$$ DELIMITER ;