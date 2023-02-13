-- TELEFONE --
CREATE TABLE Telefone (
FKId				INT UNSIGNED NOT NULL					,
CounterTelefone		INT UNSIGNED NOT NULL				    ,
Numero				CHAR (011)								,
Principal			BOOLEAN DEFAULT FALSE					,
PRIMARY KEY			(FKId, CounterTelefone)					,
UNIQUE KEY			(FKId, Numero)							,
CONSTRAINT FKTelefone_Login FOREIGN KEY(FKId) REFERENCES Login(Id) on delete cascade
);

-- PROCEDURES --

-- TELEFONE --
DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_IncluirTelefone $$ 
CREATE PROCEDURE 			PRC_IncluirTelefone
(
	IN pId				INT
, 	IN pNumero		 	VARCHAR (100)
,	IN pPrincipal		BOOLEAN

) 
main: BEGIN 

	DECLARE mCounter INT;

  	SELECT 
    	COUNT(FKId) INTO mCounter
  	FROM
    	Telefone
  	WHERE
    	FKId  = pId;

	INSERT INTO 
		Telefone
	(
	 	FKId
	,	CounterTelefone
    , 	Numero
    ,	Principal
    ) 
	VALUES
    (
		pId
	,	(mCounter + 1)
	, 	pNumero
    ,	pPrincipal
    );

	IF pPrincipal = TRUE THEN
		UPDATE
			Telefone
		SET
			Principal	= FALSE
		WHERE
			FKId			= pId
		AND
			CounterTelefone	<> (mCounter + 1);
	END IF;
        
END 
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_EditarTelefone $$ 
CREATE PROCEDURE 			PRC_EditarTelefone
(
	IN pId				INT
,	IN pCounterTelefone INT
, 	IN pNumero		 	VARCHAR (100)
,	IN pPrincipal		BOOLEAN

) 
main: BEGIN 

	UPDATE 		
		Telefone
	SET		
     	Numero      = pNumero        
    , 	Principal   = pPrincipal
  WHERE 
		FKId            =   pId
  AND 
      	CounterTelefone =   pCounterTelefone;

	IF pPrincipal = TRUE THEN
		UPDATE
			Telefone
		SET
			Principal	= FALSE
		WHERE
			FKId			= pId
		AND
			CounterTelefone	<> pCounterTelefone;
	END IF;
        
END 
$$ DELIMITER ;


DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_ConsultarTelefoneId $$
CREATE PROCEDURE 			PRC_ConsultarTelefoneId
(
	 IN pId 			INT
)
main: BEGIN 

	SELECT
		FKId
    , 	CounterTelefone
    ,	Numero
	,	Principal

	FROM 
			Telefone
	
    WHERE	
			FKId = pId;

END
$$ DELIMITER ;

DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_DetalharTelefone $$
CREATE PROCEDURE 			PRC_DetalharTelefone
(
	IN pId 				INT
,	IN pCounterTelefone	INT
)
main: BEGIN 

	SELECT
		FKId
    , 	CounterTelefone
    ,	Numero
	,	Principal

	FROM 
			Telefone
    WHERE	
			FKId = pId
	AND		CounterTelefone = pCounterTelefone;

END
$$ DELIMITER ;


DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_TelefonePrincipal $$
CREATE PROCEDURE 			PRC_TelefonePrincipal
(
	IN pId 				INT
)
main: BEGIN 

	SELECT
		FKId
    , 	CounterTelefone
    ,	Numero
	,	Principal

	FROM 
			Telefone
    WHERE	
			FKId = pId
	AND		Principal = TRUE;

END
$$ DELIMITER ;


DELIMITER $$ 
DROP PROCEDURE IF EXISTS 	PRC_DeletarTelefone $$
CREATE PROCEDURE 			PRC_DeletarTelefone
(
	IN  pId INT
,	IN	pCounterTelefone INT
)
main: BEGIN 

	DELETE FROM
		Telefone
    WHERE 
		FKId = pId
	AND	
		CounterTelefone = pCounterTelefone
	AND
		Principal		<> TRUE;
	
END
$$ DELIMITER ;