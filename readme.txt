Setup Library routing
    Plugin leaflet
    npm install leaflet-routing-machine


cara rename branch
    git branch -m master main

push ke github
    git push -u origin main

Menambahkan perubahan ke staging area
    git add . => untuk semua file yang diubah
    git add <nama_file>

Menyimpan perubahan(commit)
    git commit -m "pesan commit anda"

Mengirim perubahan remote respository (github/gitlab)
    git push origin <nama_branch>
    |->  cth: git push origin main

cara mengaktifkan aturan .gitignore
    git add .gitignore
    git commit -m "Add .gitignore"
    git push

workflow aman git
    git pull origin main --rebase
    git add .
    git commit -m "update"
    git push origin main
