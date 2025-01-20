# ./docker/mongodb/Dockerfile
# 使用官方 MongoDB 鏡像
FROM mongo:6.0

# 設置工作目錄
WORKDIR /data

# 如果有自定義配置，可以複製到容器中
COPY mongod.conf /etc/mongod.conf

# 暴露 MongoDB 默認端口
EXPOSE 27017

# 啟動 MongoDB
CMD ["mongod"]