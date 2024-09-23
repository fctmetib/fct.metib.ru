node -v;
Write-Host "Installing Angular..."
npm install -g @angular/cli;
Write-Host "Done."
Write-Host "Installing packages..."
npm install --force;
Write-Host "Done."
Write-Host "Building website..."
##set NODE_OPTIONS="--max_old_space_size=4096" 
npm run build:ssr
if (!(Test-Path "dist/metallinvestbank-web/index.html"))
{
  Write-Error "Website building failed!"
  ##teamcity[buildStop comment='canceled due website building error' readdToQueue='true']
}
else
{
  Write-Host "Done."
}
