import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.io.IOException;
import java.net.Socket;

public class ServerTCPThread extends Thread {

   private Socket socket = null;
   private ServerTCP server = null;
   private DataInputStream in = null;
   private Boolean run;
   private int cpt;

   public ServerTCPThread(ServerTCP server, Socket socket, int cpt) {
      this.server = server;
      this.socket = socket;
      this.cpt = cpt;
      this.run = true;
   }

   public void run() {
      while (this.run) {
         try {
            System.out.println(in.readUTF());

         } catch(IOException e) {
            this.cpt -= 1;
            this.run = false;
            System.out.println("A user has left the chat server.");
            
         }
      }
      if (cpt == 0) {
         try {
            this.server.closeServer();

         } catch (IOException e) {
        	 System.out.println("Error : " + e.getMessage());
         }
      }

      
   }

   public void open() throws IOException {
      in = new DataInputStream(new BufferedInputStream(this.socket.getInputStream()));
   }

   public void close() throws IOException {  
      if (this.socket != null) {
         this.socket.close();
      }
      if (in != null) {
         in.close();
      }
   }
}
