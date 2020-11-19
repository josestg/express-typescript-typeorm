# Express-TypeScript-TypeORM Example

## Local

1. Ganti `username` dan `password` yang ada di `ormconfig.json` dengan `username` dan `password` dari database Anda.
2. Buat database di mesin Anda, namanya sesuaikan dengan yang ada di `ormconfig.json`.
3. Buat file `.env` yang sama persis dengan file `.env.example` dan kemudian isi nilainya sesuai kebutuhan.
4. Jalankan server dengan `yarn start`.

## Docker

1. Menjalankan

```shell
$ docker-compose up --build -d
```

2. Melihat proses yang sedang aktif.

```shell
$ docker-compose ps
```

3. Memberhentikan

```shell
$ docker-compose stop
```
