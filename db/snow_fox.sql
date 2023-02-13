CREATE DATABASE db_snowfox;

USE db_snowfox;

-- TABLES --

-- FUNCIONARIO --
CREATE TABLE Funcionario (
FKId				INT UNSIGNED PRIMARY KEY    ,
Nome 			    VARCHAR		(146)			,
Cpf         	    CHAR		(011)			,
DataNascimento  	DATE        				,
CONSTRAINT FKFuncionario_Login FOREIGN KEY(FKId) REFERENCES Login(Id) on delete cascade
);

-- TELEFONE --
CREATE TABLE Telefone (
FKId				INT UNSIGNED PRIMARY KEY    ,
Numero            	CHAR        (011)           ,
UNIQUE KEY          (FKId, Numero)
CONSTRAINT FKTelefone_Login FOREIGN KEY(FKId) REFERENCES Login(Id) on delete cascade
);

