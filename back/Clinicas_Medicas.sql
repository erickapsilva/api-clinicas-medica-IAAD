-- Introdução ao Armazenamento e Análise de Dados (IAAD) - BSI/UFRPE
-- Ericka Pricila da Silva
-- Script referente a (Clinicas Médicas)

begin;
create schema clinicas_medicas; -- criando o esquema 
use clinicas_medicas ;

-- Área de criação de tabela:
create table CLINICA(
	CodCli INT AUTO_INCREMENT NOT NULL,
	NomeCli VARCHAR(60) NOT NULL,
	Endereco VARCHAR(60) NOT NULL,
    Telefone VARCHAR(11)  NOT NULL,
    Email VARCHAR(60) NOT NULL,
	PRIMARY KEY(CodCli) -- PK CodCli

);  

create table MEDICO(
	CodMed INT AUTO_INCREMENT NOT NULL,
    NomeMed VARCHAR(60) NOT NULL,
    Genero CHAR,
    Telefone VARCHAR(11) NOT NULL,
    Email VARCHAR(60) NOT NULL,
    CodEspec VARCHAR(15) NOT NULL, -- referencia Especialidade!
    PRIMARY KEY(CodMed), -- PK CodMed
    UNIQUE(Email)

);

create table PACIENTE(
	CpfPaciente CHAR(11) NOT NULL,
    NomePac VARCHAR(60) NOT NULL,
    DataNascimento DATE NOT NULL,
    Genero CHAR NOT NULL,
    Telefone VARCHAR(11) NOT NULL,
    Email VARCHAR(60) NOT NULL,
    PRIMARY KEY(CpfPaciente), -- PK CpfPaciente
	UNIQUE(Email)
);

create table CLINICA_MEDICO(
	CodCli INT NOT NULL, -- referencia CLINICA
	CodMed INT NOT NULL, -- referencia MEDICO
    DataIngresso DATE NOT NULL,
    CargaHorariaSemanal DECIMAL(3,1) NOT NULL DEFAULT 20.0,
    PRIMARY KEY(CodCli,CodMed)

);

create table AGENDA_CONSULTA(
	CodCli INT NOT NULL, -- referencia CLINICA_MEDICO
	CodMed INT NOT NULL, -- referencia CLINICA_MEDICO também
	CpfPaciente CHAR(11) NOT NULL, -- referencia PACIENTE
    DataHora DATETIME NOT NULL,
    PRIMARY KEY(CodCli, CodMed, CpfPaciente, DataHora)
);

create table ESPECIALIDADE(
	CodEspec VARCHAR(15) NOT NULL,
    NomeEspec VARCHAR(20) NOT NULL,
    Descricao VARCHAR(255) NOT NULL,
    PRIMARY KEY(CodEspec)
);


-- Populando o Banco
-- !!! OBS.: OS ESPAÇOS ENTRE AS LINHAS SÃO PARA MELHOR LEITURA! 

insert into CLINICA values
	(1, 'Clínica de Pediatria do Recife', 'Rua Artur Lira, 1045, Recife, PE','8133141519', 'clinicadepediatriadorecife@gmail.com'),
	
    (2, 'Grupo de Ortopedia do Recife', 'Av. Santos Silva, 247, Recife, PE','8134647539','grupodeortopediadorecife@gmail.com'),
	
    (3, 'Derma Clini', 'Av. João Melo, 4752, Olinda, PE','81998061248','dermaclini@gmail.com'),
	
    (4, 'Clínica de Ginecologia de Olinda', 'Rua Alfredo Pinheiros, 894, Olinda, PE','8134651930','clinicadeginecologiadeolinda@gmail.com'),
	
    (5, 'Clínica dos Olhos de Piedade', 'Rua Dom Bosco, 194, Jabotão dos Guararapes, PE','8133270287','clinicadosolhosdepiedade@gmail.com'),
	
    (6, 'Neuro Center', 'Rua Prof. Joana Neves, 851, Jabotão dos Guararapes, PE','8132245115','neurocenterjg@gmail.com');


insert into MEDICO values
	(1,'Jeremias Távora Camacho','M','81987196987','drjeremiastavora@gmail.com', 'OFT056'),
    
	(2,'Lunna Garrau Alvarenga','F','81998737251','dralunna_derma@gmail.com', 'DERM023'),
    
	(3,'Yana Alvelos Passos','F','81990409689','drayana.neuro@gmail.com', 'NEURO041'),
    
	(4,'Júlia Dias de Souza','F','81991885149','drajulia.derma@gmail.com', 'DERM023' ),
    
	(5,'Kauan Salomão Magalhães','M','81991941951','drkauanmagalhaes_@gmail.com', 'GINE036'),
    
	(6,'Josias Palha Terra','M','81998977942','drjosias.p.terra@gmail.com', 'PEDI062' ),
    
	(7,'Angélica Figueiredo Monforte','F','81997007053','draangelicamonforte@gmail.com', 'GINE036' ),
    
	(8,'Josué Quina Ramalho','M','81990390537','drjosueqramalho.orto@gmail.com', 'ORT059'),
    
	(9,'Nair Bandeira Alcantara','F','81991517997','dranairalcantara@gmail.com', 'PEDI062'),
    
	(10,'Carina Grangeia Valadares','F','81994670090','dracarinavaladares@gmail.com', 'DERM023'),
    
	(11,'Hugo Mafra Sobral','M','81993575435','drhugosobral@gmail.com', 'NEURO041'),
    
	(12,'Eric Junqueira Torquato','M','81996542427','dr.erictorquato@gmail.com', 'PEDI062'),
    
    (13,'Emanuelly Cristiane Raquel Ferreira','F','81997931443','dra_emanuellycraquel@gmail.com', 'DERM023'),
    
    (14,'Isabelly Gabrielly Elza Santos','F','81999767737','dra.isabellygesantos@gmail.com', 'DERM023'),
    
    (15,'Enzo Leandro Gabriel da Cunha','M','81997005396','dr_enzocunhaderma@gmail.com', 'DERM023'),
    
    (16,'Filipe Augusto Assunção','M','81996997728','filipeaugustoassuncao_@gmail.com', 'DERM023'),
    
    (17,'Rafael Antonio Novaes','M','81997134822','drarafanovaes__@gmail.com', 'DERM023'),
    
    (18,'Sophia Agatha da Paz','F','81993919806','derma_agathapaz@gmail.com', 'DERM023'),
    
    (19,'Paulo Matheus Leonardo Assis','M','81992312441','paulomatheusleonardoassis_derma@gmail.com', 'DERM023'),    
    
    (20,'Letícia Cristiane Pinto','F','81995463681','draleticiapinto_dermatologia@gmail.com', 'DERM023');
    
    
    
    


insert into PACIENTE values 
	('35072740439', 'João Alves de Lima','1983-07-05','M', '81995759812', 'joao.a.lima@gmail.com' ),
    
	('32689406411', 'Julia Ferreira Barros','1996-09-11','F', '81993041850', 'juliafbarros96@gmail.com' ),
    
	('99100411469', 'Fernanda Pereira Carvalho','1978-10-15','F', '81996096191', 'fernanda_pcarvalho@gmail.com' ),
    
	('13306103420', 'Camila Azevedo Goncalves','1993-02-02','F', '81999474126', '_camilaazevedog@gmail.com' ),
    
	('34980536476', 'Enzo Sousa Fernandes','1985-05-13','M', '81990158380', 'enzo_sfernandes@gmail.com' ),
    
	('04205103468', 'Joao Goncalves Ferreira','2007-11-27','M', '81999587188', 'joaogferreira__@gmail.com' ),
    
	('17448441434', 'Sarah Dias Castro','1988-12-08','F', '81998740653', '__sarahdiascastro10@gmail.com' ),
    
	('60134270460', 'Murilo Correia de Oliveira','2006-01-11','M', '81990001268', 'murilo_correiadeoliveira@gmail.com' ),
    
	('90657790435', 'Maria José Almeida Lins','1963-08-29','F', '81998421228', 'mariajose.alins63@gmail.com' ),
    
	('47033278489', 'Fábio Cavalcanti Martins','1991-10-30','M', '81993727543', 'fabiocavalcantimartins1991@gmail.com' ),
    
	('76312988406', 'Rafael Barbosa Castro','1981-07-01','M', '81995929039', 'bcastro.rafael@gmail.com' ),
    
	('49685251410', 'Vitoria Martins Melo','1995-01-19','F', '81991198007', 'vitoriammelo__95@gmail.com' );


insert into ESPECIALIDADE values
	('DERM023','Dermatologia', 'Área especializada no tratamento de problemas de pele e seus anexos'),
	('GINE036','Ginecologia', 'Área especializada em cuidads com a saúde intima da mulher'),
	('NEURO041','Neurologia', 'Área especializada em tratar os aspectos clínicos do sistema nervoso'),
	('ORT059','Ortopedia', 'Tratamento de problemas nos músculos e ossos, principalmente relacionados às fraturas e outros tipos de traumas'),
	('OFT056','Oftalmologia', 'Prevenção e tratamento de doenças oculares'),
	('PEDI062','Pediatria', 'Prevenção e tratamento de doenças em crianças e adolescentes');


insert into CLINICA_MEDICO values
	-- pediatria
	(1,6,'2018-07-11', 40.0),
	(1,9,'2020-02-08', 40.0),
	(1,12,'2019-10-01', 40.0),
    
	-- ortopedia
	-- (2,8,'2017-06-13', 48.0),
    
	-- dermatologia
	(3,2,'2016-11-12', 48.0),
	(3,4,'2017-05-18', 32.0),
	(3,10,'2018-03-22', 32.0),
    
    (3,14,'2015-07-09', 32.0),
    (3,16,'2015-04-12', 32.0),
    (3,19,'2015-11-26', 32.0),
	-- ginecologia
	(4,5,'2019-04-24', 32.0),
	(4,7,'2020-07-01', 40.0),
	-- oftalmologia
	(5,1,'2017-07-12', 48.0);
    
	-- neurologia	
	-- (6,3,'2018-03-28', 56.0);

insert into AGENDA_CONSULTA values
	(3, 2, '13306103420', '2021-09-28 14:30:00'),
	(1, 6, '04205103468', '2021-09-29 10:30:00'),
	(1, 12, '60134270460', '2021-10-01 11:00:00'),
    (5,1, '76312988406', '2021-10-05 15:45:00' ),
    -- (6,3, '90657790435', '2021-09-27 08:45:00' ),
    (4,7, '34980536476', '2021-09-11 08:45:00' );
	
create procedure ver_email(CodigoM VARCHAR(6))
select concat ('O email do médico é ', Email) as Email
from Medico
where CodMed = CodigoM;

DELIMITER $$
CREATE TRIGGER verifcacao_paciente BEFORE INSERT 
ON paciente
FOR EACH ROW
BEGIN
  DECLARE CPF INT;
select count(*) INTO CPF
from paciente
where paciente.CpfPaciente = New.CpfPaciente;

IF CPF > 0 
	THEN signal sqlstate '45000' set message_text = 'Cpf Já Cadastrado';
	END IF;
END$$

DELIMITER ;    


-- Aplicando as restrições de integridade referencial (chaves estrangeiras - FK)
alter table MEDICO ADD FOREIGN KEY(CodEspec) REFERENCES ESPECIALIDADE(CodEspec)
	ON DELETE CASCADE
	ON UPDATE CASCADE;
    
alter table CLINICA_MEDICO ADD FOREIGN KEY(CodCli) REFERENCES CLINICA(CodCli);
alter table CLINICA_MEDICO ADD FOREIGN KEY(CodMed) REFERENCES MEDICO(CodMed)
	ON DELETE CASCADE
	ON UPDATE CASCADE;

alter table AGENDA_CONSULTA	ADD FOREIGN KEY(CodCli) REFERENCES CLINICA_MEDICO(CodCli)
	ON DELETE CASCADE						
	ON UPDATE CASCADE;
alter table AGENDA_CONSULTA	ADD FOREIGN KEY(CodMed) REFERENCES CLINICA_MEDICO(CodMed)
	ON DELETE CASCADE
	ON UPDATE CASCADE;
alter table AGENDA_CONSULTA	ADD FOREIGN KEY(CpfPaciente) REFERENCES PACIENTE(CpfPaciente);


    

commit;
