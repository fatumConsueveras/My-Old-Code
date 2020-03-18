dim xHttp: Set xHttp = createobject("MSXML2.ServerXMLHTTP")
Set objFSO=CreateObject("Scripting.FileSystemObject")

testUrl="https://ss64.com/"
testfile="htmlDocument.txt"

sub saveHtml(outFile,inUrl)
	Set objFile = objFSO.CreateTextFile(outFile,True)
	objFile.Write getHtml(inUrl) & vbCrLf
	objFile.Close
end sub

function getHtml(myUrl)
	xHttp.Open "GET", myUrl, False
	' 2 stands for SXH_OPTION_IGNORE_SERVER_SSL_CERT_ERROR_FLAGS
	' 13056 means ignore all server side cert error
	xHttp.setOption 2, 13056
	xHttp.Send

	' read response body
	getHtml= xHttp.responseText
end function

saveHtml testFile, testUrl

WScript.echo "[Done]"