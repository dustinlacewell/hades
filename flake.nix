{
  description = "A DI Discord bot framework";

  inputs = {
    nixpkgs.url = "nixpkgs/nixpkgs-unstable";
    fu.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, fu }:
    fu.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};
      in { devShell = import ./shell.nix { inherit pkgs; }; });
}
