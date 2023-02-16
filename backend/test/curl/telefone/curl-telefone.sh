curl -d @data-patch.json -H "Content-Type: application/json" -XPATCH 127.0.0.1:3000/v1/telefone/1

curl -d @data-post.json -H "Content-Type: application/json" -XPOST 127.0.0.1:3000/v1/telefone

curl -XGET 127.0.0.1:3000/v1/telefone/23/all

curl -XGET 127.0.0.1:3000/v1/telefone/23

curl -XGET 127.0.0.1:3000/v1/telefone/23/1