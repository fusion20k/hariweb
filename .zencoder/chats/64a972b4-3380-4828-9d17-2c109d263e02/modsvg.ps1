$src = 'C:\Users\david\Desktop\Hari\assets\HariLogoRoundHead.svg'
$dst = 'C:\Users\david\Desktop\HariWeb\assets\HariLogoRoundHead.svg'
$xml = [System.IO.File]::ReadAllText($src)
$xml = $xml.Replace('viewBox="0 0 1920 1080"', 'viewBox="440 70 1000 870"')
$xml = $xml.Replace('<path class="st0" d=', '<path class="st0" fill="white" d=')
[System.IO.File]::WriteAllText($dst, $xml, [System.Text.Encoding]::UTF8)
Write-Host "Done"
