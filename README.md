# Cloud IDE

A web-based Integrated Development Environment (IDE) that allows users to write, run, and manage code directly from the browser. This project is designed for flexibility, scalability, and ease of use.

## 🚀 Features

- **Real-Time Terminal:** Interactive terminal with real-time output.
- **File Explorer:** Manage project files in a structured tree view.
- **Multi-language Support:** Write and execute code in various programming languages.
- **Custom DNS Server:** Efficient routing and resource handling.
- **Responsive UI:** Sleek and user-friendly interface.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, SCSS
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MySQL
- **Other Tools:** `node-pty` for terminal emulation, Socket.IO for real-time communication

## 📂 Folder Structure

```
cloud-ide-main/
├── client/         # Frontend (React)
├── server/         # Backend (Node.js, Express)
├── .gitignore      # Git ignored files
├── package.json    # Project dependencies
└── README.md       # Project documentation
```

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PranavPawar0/Cloud-IDE.git
   cd Cloud-IDE
   ```

2. **Install dependencies:**
   - **Frontend:**
     ```bash
     cd client
     npm install
     ```
   - **Backend:**
     ```bash
     cd ../server
     npm install
     ```

3. **Configure Database:**
   Update `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in the backend configuration.

4. **Run the project:**
   - **Backend:**
     ```bash
     npm run dev
     ```
   - **Frontend:**
     ```bash
     cd ../client
     npm run dev
     ```

5. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Acknowledgements

- Inspired by popular online IDEs.
- Built with passion by Pranav Pawar.

---

> Feel free to reach out for any feedback or suggestions!

**Pranav Pawar**  
[LinkedIn](https://linkedin.com/in/pranavpawar0) | [GitHub](https://github.com/PranavPawar0)
