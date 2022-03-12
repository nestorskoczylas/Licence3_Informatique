import java.net.ServerSocket;
import java.net.Socket;
import java.io.IOException;
import java.io.PrintStream;
import java.lang.String;

public class serverTCP{

    public static void main (String[] args){

        try{
            ServerSocket server = new ServerSocket(2021);
            while(true){
                Socket socket = server.accept();
                System.out.println("New connection from :"+socket.getRemoteSocketAddress());
                String msg = "Bienvenue sur mon serveur et au revoir";
                PrintStream out = new PrintStream(socket.getOutputStream());
                out.println(msg);
                socket.close();
            }
        }catch (IOException e){
            e.printStackTrace();
        }
        
    }
}
