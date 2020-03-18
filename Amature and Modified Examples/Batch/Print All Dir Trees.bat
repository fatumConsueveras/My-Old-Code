@echo off
if not exist "%cd%\Dir Tree Output" md "%cd%\Dir Tree Output"
if exist "%cd%\Dir Tree Output" cd "%cd%\Dir Tree Output"
for %%p in (a b c d e f g h i j k l m n o p q r s t u v w x y z) do (
	if exist %%p:\nul @tree /a /f %%p:\ > %%p-dir_Computer-%computername%.txt
	if not exist %%p:\nul @echo [Failure for %%p]
	if exist %%p:\nul @echo [Sucess for %%p]
)
@echo.
@echo [exiting Dir Tree Output...]
PING localhost -n 2 >NUL