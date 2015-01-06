echo "Let's get this party started!"
echo

echo "Checking for NPM …"

if [ ! -d ~/.npm ]; then
  echo "  NPM not found …"
  echo
  echo "  Installing NPM …"
  echo
  curl https://www.npmjs.org/install.sh | sh
fi

echo
echo "  NPM Installed!"
echo

echo "Installing Grunt …"
echo
npm install -g grunt-cli
echo
echo "Grunt installed!"
echo

echo "Installing NPM packages"
echo
npm install
echo
echo "Packages installed!"
echo

echo
echo "We have succesfully bootstrapped your environment!"
echo
echo "(poolparty)"
echo
