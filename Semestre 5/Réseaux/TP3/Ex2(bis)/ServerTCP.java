import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class ServerTCP implements Runnable {

   private ServerSocket server = null;
   private Thread thread = null;
   private ServerTCPThread client = null;
   private int cpt = 0;

   public ServerTCP(int port) {
      try {
         System.out.println("Binding to port " + port + ", please wait  ...");
         this.server = new ServerSocket(port);  
         System.out.println("Server started !!");
         start();

      } catch(IOException e) {
            System.out.println("Error : " + e.getMessage());
      }
   }

   public void run() {
      while (thread != null) {
         try {
            addThread(this.server.accept());

         } catch(IOException e) {
            thread = null;
            System.out.println("Server Timeout !");
         }
      }
   }

   public void addThread(Socket socket) {
      cpt += 1;
      client = new ServerTCPThread(this, socket, cpt);
      try {
         client.open();
         client.start();

      } catch(IOException e) {
         System.out.println("Error : " + e.getMessage());
      }
   }

   public void start() {
      if (thread == null) {
         thread = new Thread(this); 
         thread.start();
      }
   }

   public void closeServer() throws IOException {
      if (!server.isClosed()) {
         server.close();
      }
   }

   public static void main(String args[]) {
      ServerTCP server = null;
      if (args.length != 1) {
         System.out.println("Usage: java ServerTCP port");
      }  
      else {
         server = new ServerTCP(Integer.parseInt(args[0]));
      } 
   }
}
