Dim shell, shell2
Set shell = CreateObject("WScript.Shell")
shell.run "cmd /k run"
Set shell2 = CreateObject("WScript.Shell")
shell2.run "cmd /k watch"
