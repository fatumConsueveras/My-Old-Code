   sComputerName = "."
   Set objWMIService = GetObject("winmgmts:\\" & sComputerName & "\root\cimv2")
   sQuery = "SELECT * FROM Win32_Process"
   Set objItems = objWMIService.ExecQuery(sQuery)
   'iterate all item(s)
	count = 0
   For Each objItem In objItems
	if objItem.Name = "wscript.exe" then
		count = count + 1
		WScript.Echo "Process [Name:" & objItem.Name & "]"
	end if
   Next
