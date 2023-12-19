FROM node 
WORKDIR /api
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "node", "/server" ]

# ocker build .
# docker run  -d -p 4000:3000 $id