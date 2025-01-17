import "./App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Box, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";

function App() {
  const [autor, setAutor] = useState("");
  const [recado, setRecado] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://mais-informa-full.onrender.com/recados")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  const handlePostar = () => {
    if (autor && recado) {
      fetch("https://mais-informa-full.onrender.com/recado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ autor, recado }),
      }).then((data) => {
        setPosts([...posts, { id: data.id, autor, recado }]);
        setAutor("");
        setRecado("");
      });
    }
  };

  return (
    <div className="App">
      <Box sx={styles.form}>
        <TextField
          label="Autor"
          variant="outlined"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          fullWidth
          sx={styles.input}
        />
        <TextField
          label="Recado"
          variant="outlined"
          value={recado}
          onChange={(e) => setRecado(e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={styles.input}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePostar}
          sx={styles.button}
        >
          Postar
        </Button>
      </Box>

      {posts.map((post) => (
        <Card key={post.id} variant="outlined" sx={styles.card}>
          <CardContent>
            <Box sx={styles.header}>
              <Avatar sx={styles.avatar}>
                {post.autor.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={styles.authorInfo}>
                <Typography variant="h6" component="div" sx={styles.authorName}>
                  {post.autor}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={styles.content}>
              {post.recado}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const styles = {
  form: {
    maxWidth: 400,
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    marginBottom: "10px",
  },
  button: {
    alignSelf: "center",
    width: "100%",
  },
  card: {
    maxWidth: 400,
    margin: "20px auto",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: "10px",
  },
  authorInfo: {
    display: "flex",
    flexDirection: "column",
  },
  authorName: {
    fontWeight: "bold",
  },
  content: {
    fontSize: "16px",
  },
};

export default App;
