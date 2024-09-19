node -v;
Write-Host "Installing Angular..."
npm install -g @angular/cli;
Write-Host "Done."
Write-Host "Installing packages..."
npm install --force;
Write-Host "Done."
Write-Host "Building website..."
npm run-script build:ssr;
if (!(Test-Path "dist/metallinvestbank-web/index.html"))
{
  Write-Error "Website building failed!"
  ##teamcity[buildStop comment='canceled due website building error' readdToQueue='true']
}
else
{
  Write-Host "Done."
}
