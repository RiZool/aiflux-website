# Generates LinkedIn COMPANY PAGE assets for AI Flux: square logo (400x400) + cover banner (1128x191)
Add-Type -AssemblyName System.Drawing

$logoPath = "C:\Projects\aiflux-website\public\logo_F.png"
$logo = [System.Drawing.Image]::FromFile($logoPath)

# ---------- 1) Square logo 400x400 ----------
$LW = 400; $LH = 400
$lb = New-Object System.Drawing.Bitmap($LW, $LH)
$lg = [System.Drawing.Graphics]::FromImage($lb)
$lg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$lg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$lrect = New-Object System.Drawing.Rectangle(0, 0, $LW, $LH)
$lg.FillRectangle((New-Object System.Drawing.Drawing2D.LinearGradientBrush($lrect, [System.Drawing.Color]::FromArgb(255,5,5,16), [System.Drawing.Color]::FromArgb(255,13,22,53), 135.0)), $lrect)

# glow
$gp = New-Object System.Drawing.Drawing2D.GraphicsPath
$gp.AddEllipse(120, 40, 320, 320)
$gl = New-Object System.Drawing.Drawing2D.PathGradientBrush($gp)
$gl.CenterColor = [System.Drawing.Color]::FromArgb(60, 0, 229, 255)
$gl.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0, 102, 255))
$lg.FillPath($gl, $gp)

$mH = 230.0
$mW = $mH * ($logo.Width / $logo.Height)
$lg.DrawImage($logo, [int](($LW - $mW)/2), [int](($LH - $mH)/2), [int]$mW, [int]$mH)
$lb.Save("$env:USERPROFILE\Desktop\aiflux-linkedin-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$lg.Dispose(); $lb.Dispose()

# ---------- 2) Cover banner 1456x208 (wide-short ~7:1 to fit LinkedIn company cover crop) ----------
$W = 1456; $H = 208
$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

$bgRect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
$g.FillRectangle((New-Object System.Drawing.Drawing2D.LinearGradientBrush($bgRect, [System.Drawing.Color]::FromArgb(255,5,5,16), [System.Drawing.Color]::FromArgb(255,13,22,53), 0.0)), $bgRect)

$gp2 = New-Object System.Drawing.Drawing2D.GraphicsPath
$gp2.AddEllipse(900, -200, 760, 560)
$gl2 = New-Object System.Drawing.Drawing2D.PathGradientBrush($gp2)
$gl2.CenterColor = [System.Drawing.Color]::FromArgb(55, 0, 229, 255)
$gl2.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0, 102, 255))
$g.FillPath($gl2, $gp2)

# top accent bar
$g.FillRectangle((New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.Rectangle(0,0,$W,6)), [System.Drawing.Color]::FromArgb(255,0,229,255), [System.Drawing.Color]::FromArgb(255,0,102,255), 0.0)), 0, 0, $W, 6)

# logo right (vertically centered)
$bH = 150.0
$bW = $bH * ($logo.Width / $logo.Height)
$g.DrawImage($logo, [int]($W - $bW - 70), [int](($H - $bH)/2), [int]$bW, [int]$bH)

# text (vertically centered block, single main line)
$tx = 64
$kickFont = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString("AI FLUX", $kickFont, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,0,229,255))), [single]$tx, 48.0)

$mainFont = New-Object System.Drawing.Font("Segoe UI", 38, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$line = "AI automatiz" + [char]0x00E1 + "ci" + [char]0x00F3 + ", chatbotok & weboldalak c" + [char]0x00E9 + "geknek"
$g.DrawString($line, $mainFont, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,245,248,255))), [single]$tx, 78.0)

$subFont = New-Object System.Drawing.Font("Segoe UI", 21, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$sub = "aiflux.hu   " + [char]0x00B7 + "   ingyenes konzult" + [char]0x00E1 + "ci" + [char]0x00F3
$g.DrawString($sub, $subFont, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210,150,180,220))), [single]$tx, 134.0)

$bmp.Save("$env:USERPROFILE\Desktop\aiflux-company-banner.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $logo.Dispose()
Write-Output "Saved: aiflux-linkedin-logo.png + aiflux-company-banner.png (Desktop)"
