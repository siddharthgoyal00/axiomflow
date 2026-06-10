-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Documents table (tracks uploaded files per user)
CREATE TABLE IF NOT EXISTS documents (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     VARCHAR(255) NOT NULL,
    file_name   VARCHAR(500) NOT NULL,
    file_path   VARCHAR(1000) NOT NULL,
    file_size   BIGINT,
    status      VARCHAR(50) DEFAULT 'PROCESSING',
    chunk_count INT DEFAULT 0,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW()
);

-- Spring AI vector store table (pgvector)
-- Spring AI creates this automatically but we ensure vector extension is ready
CREATE TABLE IF NOT EXISTS vector_store (
    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content   TEXT,
    metadata  JSON,
    embedding vector(768)
);

CREATE INDEX IF NOT EXISTS vector_store_embedding_idx
    ON vector_store USING hnsw (embedding vector_cosine_ops);

-- Chat history table
CREATE TABLE IF NOT EXISTS chat_messages (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          VARCHAR(255) NOT NULL,
    document_id      UUID,
    role             VARCHAR(20) NOT NULL,
    content          TEXT NOT NULL,
    prompt_tokens    INT DEFAULT 0,
    completion_tokens INT DEFAULT 0,
    total_tokens     INT DEFAULT 0,
    created_at       TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS chat_messages_user_idx ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS documents_user_idx ON documents(user_id);
