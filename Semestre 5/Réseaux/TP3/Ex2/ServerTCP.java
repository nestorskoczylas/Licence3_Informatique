import java.io.*;
import java.net.*;
import java.util.ArrayList;

public class ServerTCP implements Runnable {

	private ServerSocket server;
	private Socket socket;
	private ArrayList<DataOutputStream> outToClients;
	private ArrayList<ServerTCPThread> serverTCPThreadList;
	private int cpt = 0;
	private Thread thread = null;

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
		serverTCPThreadList = new ArrayList<ServerTCPThread>();
		outToClients = new ArrayList<DataOutputStream>();

		while (thread != null) {
			try {
				socket = this.server.accept();
				DataOutputStream out = new DataOutputStream(socket.getOutputStream());
				outToClients.add(out);
				serverTCPThreadList.add(new ServerTCPThread(socket, cpt++, outToClients, serverTCPThreadList));
				serverTCPThreadList.get(serverTCPThreadList.size() - 1).start();
			
			} catch (IOException e) {
				thread = null;
				System.out.println("Error : " + e.getMessage());
			}
		}
	}

	public void start() {
		if (thread == null) {
			thread = new Thread(this); 
			thread.start();
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
