export default {
  name: "ping",
  onCall: function(api,message,args) {
    message.send("Pong")
  }
}