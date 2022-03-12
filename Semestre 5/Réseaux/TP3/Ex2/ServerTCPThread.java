import java.io.*;
import java.net.*;
import java.util.ArrayList;

public class ServerTCPThread extends Thread {

	private Integer id;
	private Boolean run = false;
	private Socket serverTCPThreadSocket;
	private String msg, outMessage;
	private BufferedReader in;
	private DataOutputStream out;
	private ArrayList<DataOutputStream> outToClients;
	private ArrayList<ServerTCPThread> serverTCPThreadList;

	public ServerTCPThread(Socket serverTCPThreadSocket, Integer id, ArrayList<DataOutputStream> outToClients, ArrayList<ServerTCPThread> serverTCPThreadList) {
		this.serverTCPThreadSocket = serverTCPThreadSocket;
		this.id = id;
		this.outToClients = outToClients;
		this.serverTCPThreadList = serverTCPThreadList;
	}

	public void run() {
		System.out.println("Connected with : " + this.id);
		run = true;
		try {
			in = new BufferedReader(new InputStreamReader(this.serverTCPThreadSocket.getInputStream()));

			while (true) {
				msg = in.readLine();
				System.out.println(this.id + "> " + msg);	//Ecrit coté Server

				if (msg.equals(":q")) {	//NullPointerException : null.equals(":q") interdit
					System.out.println("A user has left the chat server.");
					break;

				} else {
					outMessage = this.id + "> " + msg + '\n';	//Ecrit coté Client
					for (int i = 0; i < this.outToClients.size(); i++) {
						if (this.serverTCPThreadList.get(i).run)
							this.outToClients.get(i).writeBytes(outMessage);
					}
				}

			}
			run = false;
			this.serverTCPThreadSocket.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
