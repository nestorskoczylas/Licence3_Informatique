import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

public class ClientTCP {
    private Socket socket = null;
    private DataInputStream cmd = null;
    private DataOutputStream out = null;

    @SuppressWarnings("deprecation")
	public ClientTCP(String serverName, int serverPort) {
        System.out.println("Establishing connection. Please wait ...");
        System.out.println("If you want to quit the chat server, enter \": q\"");
        try {
            this.socket = new Socket(serverName, serverPort);
            start();
        } 
        catch(UnknownHostException e) {
            System.out.println("Error : " + e.getMessage());

        } catch(IOException e) {
            System.out.println("Error : " + e.getMessage());
        }

        Scanner s = new Scanner(System.in);
        System.out.println("Enter your name : ");
        String nameClient = s.nextLine();
        System.out.println("Client name : " + nameClient);

        String line = "";
        while (!line.equals(":q")) {
            try {
                line = cmd.readLine();
                out.writeUTF(nameClient + "> " + line);
                out.flush();    //vide tous les tampons internes qui peuvent être utilisés 

            } catch(IOException e) {
            System.out.println("Error : " + e.getMessage());
            }
        }
        System.out.println("You left the chat server.");
    }

    public void start() throws IOException {
        cmd = new DataInputStream(System.in);
        out = new DataOutputStream(this.socket.getOutputStream());
    }

    public static void main(String args[]) {
        ClientTCP client = null;
        if (args.length != 2) {
            System.out.println("Usage: java ChatClient host port");
        }
        else {
            client = new ClientTCP(args[0], Integer.parseInt(args[1]));
        }
    }
}
