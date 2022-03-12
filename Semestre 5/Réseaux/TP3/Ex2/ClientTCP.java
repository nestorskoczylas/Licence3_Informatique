import java.io.*;
import java.net.*;

public class ClientTCP extends Thread {

	public static void main(String args[]) throws Exception {
		Socket clientSocket = null;
		String msg = null;
		ClientListener clientListener;
		ServerListener serverListener;


	clientSocket = new Socket(args[0], Integer.parseInt(args[1]));

		clientListener = new ClientListener(msg, clientSocket);
		serverListener = new ServerListener(clientSocket);

		clientListener.start();
		serverListener.start();

		clientListener.join();
		serverListener.join();

		clientSocket.close();
	}
}

class ServerListener extends Thread {
	Socket clientSocket;
	BufferedReader in; 
	String msg;
	
	public ServerListener(Socket c) {
		clientSocket = c;
		System.out.println("Establishing connection. Please wait ...");
        System.out.println("If you want to quit the chat server, enter \": q\"");
	}
	
	public void run() {
		try{
			while(true) {
				in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
				msg = in.readLine();
				System.out.println(msg);
				if(msg.equals(":q")){	//NullPointerException : null.equals(":q") interdit
					break;
				}
			}
			
		} catch (NullPointerException e) {
			//e.printStackTrace();
			System.out.println("Error : " + e.getMessage());
		} catch (IOException e) {
			//e.printStackTrace();
			System.out.println("Error : " + e.getMessage());
		}
	}
}


class ClientListener extends Thread {
	String msg;
	Socket clientSocket;
	BufferedReader in;
	DataOutputStream out;

	public ClientListener(String m, Socket c) throws Exception {
		msg = m;
		clientSocket = c;
		in = new BufferedReader(new InputStreamReader(System.in));
		out = new DataOutputStream(clientSocket.getOutputStream());
	}

	public void run() {
		try {
			while (true) {
				msg = in.readLine();
				out.writeBytes(msg + '\n');
				if (msg.endsWith(":q")) {	
					System.out.println("You left the chat server.");
					break;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
