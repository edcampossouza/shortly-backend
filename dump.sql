SET
    statement_timeout = 0;

SET
    lock_timeout = 0;

SET
    idle_in_transaction_session_timeout = 0;

SET
    client_encoding = 'UTF8';

SET
    standard_conforming_strings = on;

SELECT
    pg_catalog.set_config('search_path', '', false);

SET
    check_function_bodies = false;

SET
    xmloption = content;

SET
    client_min_messages = warning;

SET
    row_security = off;

SET
    default_tablespace = '';

SET
    default_table_access_method = heap;

--
-- Name: url; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE public.url (
    id integer NOT NULL,
    "user" integer NOT NULL,
    "shortUrl" character varying(50) NOT NULL,
    url character varying(2048) NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);

ALTER TABLE
    public.url OWNER TO postgres;

--
-- Name: url_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--
CREATE SEQUENCE public.url_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
    public.url_id_seq OWNER TO postgres;

--
-- Name: url_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--
ALTER SEQUENCE public.url_id_seq OWNED BY public.url.id;

--
-- Name: user_account; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE public.user_account (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);

ALTER TABLE
    public.user_account OWNER TO postgres;

--
-- Name: user_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--
CREATE SEQUENCE public.user_account_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
    public.user_account_id_seq OWNER TO postgres;

--
-- Name: user_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--
ALTER SEQUENCE public.user_account_id_seq OWNED BY public.user_account.id;

--
-- Name: url id; Type: DEFAULT; Schema: public; Owner: postgres
--
ALTER TABLE
    ONLY public.url
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.url_id_seq' :: regclass);

--
-- Name: user_account id; Type: DEFAULT; Schema: public; Owner: postgres
--
ALTER TABLE
    ONLY public.user_account
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.user_account_id_seq' :: regclass);

--
-- Name: url url_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
    ONLY public.url
ADD
    CONSTRAINT url_pkey PRIMARY KEY (id);

--
-- Name: url url_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
    ONLY public.url
ADD
    CONSTRAINT "url_shortUrl_key" UNIQUE ("shortUrl");

--
-- Name: user_account user_account_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
    ONLY public.user_account
ADD
    CONSTRAINT user_account_email_key UNIQUE (email);

--
-- Name: user_account user_account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
    ONLY public.user_account
ADD
    CONSTRAINT user_account_pkey PRIMARY KEY (id);

--
-- Name: url url_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
    ONLY public.url
ADD
    CONSTRAINT url_user_fkey FOREIGN KEY ("user") REFERENCES public.user_account(id);

--
-- PostgreSQL database dump complete
--