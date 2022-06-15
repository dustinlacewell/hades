{ pkgs ? import <nixpkgs> { } }:
with pkgs;
mkShell {
  buildInputs = with pkgs; [ nodejs-14_x yarn mongodb sqlite ];

  shellHook = ''
    alias serve='npx webpack serve'
    alias build='npx webpack'
    export PATH="$PWD/node_modules/.bin/:$PATH"
  '';
}
