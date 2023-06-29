"use client";

import React, { useState, useEffect } from "react";

interface Comment {
  id: number;
  content: string;
}

const CommentSection: React.FC = () => {
  //funcoes pra manipular o estado de comentarios ja existentes e novos

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/comments"); // Endpoint para buscar os comentários no servidor
      const data = await response.json();
      setComments(data); // os comentarios ja feitos sao armazenados aqui
    } catch (error) {
      console.error("Erro ao buscar os comentários:", error);
    }
  };

  //funcao de submit do form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newComment.trim() === "") {
      return;
    }

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        setNewComment("");
        fetchComments();
      } else {
        console.error("Erro ao adicionar o comentário.");
      }
    } catch (error) {
      console.error("Erro ao adicionar o comentário:", error);
    }
  };

  return (
    <div className="w-96">
      <h2 className="mb-5">Seção de Comentários</h2>

      <div>
        {comments.map((comment) => (
          <div key={comment.id}>{comment.content}</div> // para cada comentario ele gera uma div
        ))}
      </div>

      <form onSubmit={handleSubmit} className="w-1/2">
        <textarea
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder="Digite seu comentário..."
          className="w-96"
        ></textarea>
        <br />
        <button className="border-solid" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
