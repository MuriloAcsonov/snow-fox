-- LOGIN --
CREATE TABLE Login (
Id 				INT UNSIGNED NOT NULL AUTO_INCREMENT,
Tipo			INT UNSIGNED	 					,
Email 			VARCHAR		(100)					,
Senha	 		VARCHAR		(030)					,
PRIMARY KEY		(Id),
UNIQUE KEY      (Id, Tipo)
);

-- PROCEDURES --

-- LOGIN --
DELIMITER $$ 
DROP PROCEDURE IF EXISTS PRC_IncluirLogin $$ 
CREATE PROCEDURE PRC_IncluirLogin
(
	IN pTipo			INT
, 	IN pEmail		 	VARCHAR (100)
,	IN pSenha			VARCHAR (030)
,	OUT pId				INT

) 
main: BEGIN 

	INSERT INTO 
		Login
	(
	 	Tipo
    , 	Email
    ,	Senha
    ) 
	VALUES
    (
		pTipo
	, 	pEmail
    ,	pSenha
    );
    
    SET pId 
		= 
    LAST_INSERT_ID();
    
END 
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_EditarLogin $$
CREATE PROCEDURE 			PRC_EditarLogin
(
	IN  pId			 		 INT
,	IN  pTipo 				 INT 
, 	IN  pEmail		 		 VARCHAR (100)
)
main: BEGIN 

	UPDATE 		
		Login
	SET 	
	  Tipo = pTipo
    , Email = pEmail
    WHERE 
		Id = pId;
	
END
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_VerificarLogin $$
CREATE PROCEDURE 			PRC_VerificarLogin 
(
	IN  pEmail  VARCHAR (100)
,	IN  pSenha  VARCHAR (030)
,   IN  pTipo   INT
)
main: BEGIN 

	SELECT
			Id
,			Tipo    
	FROM 
			Login
	
    WHERE	
			Email = pEmail
	AND	
			Senha = pSenha
    AND
            Tipo  = pTipo;

END
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_EsquecerSenha $$
CREATE PROCEDURE 			PRC_EsquecerSenha 
(
	IN  pEmail  VARCHAR (100)
,   IN  pTipo   INT
)
main: BEGIN 

	SELECT
			Senha
	FROM 
			Login
	
    WHERE	
			Email = pEmail
    AND
            Tipo  = pTipo;
END
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_ConsultarLogin $$
CREATE PROCEDURE 			PRC_ConsultarLogin 
(
	 IN pId 			INT
)
main: BEGIN 

	SELECT
		Id
	,	Tipo
    , 	Email
    ,	Senha

	FROM 
			Login
	
    WHERE	
			Id = pId;

END
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_DeletarLogin $$
CREATE PROCEDURE 			PRC_DeletarLogin
(
	IN  pId INT
)
main: BEGIN 

	DELETE FROM
		Login
    WHERE 
		Id = pId;
	
END
$$ DELIMITER ;