node -v;
Write-Host "Installing Angular..."
npm install -g @angular/cli;
Write-Host "Done."
Write-Host "Installing packages..."
npm install --force;
Write-Host "Done."
Write-Host "Building website..."
ng build;
Write-Host "Done."
