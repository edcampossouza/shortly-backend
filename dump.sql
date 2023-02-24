--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: url; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.url (
    id integer NOT NULL,
    "user" integer NOT NULL,
    "shortUrl" character varying(50) NOT NULL,
    url character varying(2048) NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: url_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.url_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: url_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.url_id_seq OWNED BY public.url.id;


--
-- Name: user_account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_account (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: user_account_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_account_id_seq OWNED BY public.user_account.id;


--
-- Name: url id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url ALTER COLUMN id SET DEFAULT nextval('public.url_id_seq'::regclass);


--
-- Name: user_account id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account ALTER COLUMN id SET DEFAULT nextval('public.user_account_id_seq'::regclass);


--
-- Data for Name: url; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.url VALUES (5, 2, 'LfTjr6n4', 'http://google.com.br', 1, '2023-02-14 17:01:11.636831');
INSERT INTO public.url VALUES (6, 2, 'x7LOd7tV', 'http://facebook.com.br', 2, '2023-02-14 17:03:18.369213');
INSERT INTO public.url VALUES (4, 1, '-xpkv2B_', 'http://google.com', 4, '2023-02-14 17:00:41.476373');
INSERT INTO public.url VALUES (7, 2, 'vpYM8ff3', 'http://google.com', 0, '2023-02-14 22:51:25.980276');
INSERT INTO public.url VALUES (8, 2, 'BnPvTk_u', 'http://google.com', 0, '2023-02-14 22:55:13.013484');
INSERT INTO public.url VALUES (9, 2, '5ZsJU6dk', 'http://google.com', 0, '2023-02-14 22:55:22.447527');
INSERT INTO public.url VALUES (10, 2, 't-CPlxOr', 'http://google.com', 1, '2023-02-14 22:57:00.305111');
INSERT INTO public.url VALUES (11, 2, '_6z1FOwv', 'http://google.com', 0, '2023-02-14 22:57:55.750253');


--
-- Data for Name: user_account; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_account VALUES (1, 's', '$2b$10$Q22nXq0ri9chzBM0O8Sqnezo8MI/nVLBqo6Fcrw8gCLYiutIXV7HG', 'edd@ss.ss', '2023-02-14 13:22:28.664766');
INSERT INTO public.user_account VALUES (2, 's', '$2b$10$nyvj/VM.nqcV6tdz5clqWufujyayLd29cMm/xl3nvQN4BhO0ayawO', 'edsd@ss.ss', '2023-02-14 16:06:39.976096');
INSERT INTO public.user_account VALUES (3, 's', '$2b$10$O3m7DyFg.c5UGybg79ZgMOhOBvEd/i0hiYg1b.Cxb1qvn1QvdTtNG', 'dudu@ss.ss', '2023-02-14 17:23:46.644751');


--
-- Name: url_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.url_id_seq', 11, true);


--
-- Name: user_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_account_id_seq', 3, true);


--
-- Name: url url_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_pkey PRIMARY KEY (id);


--
-- Name: url url_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT "url_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: user_account user_account_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_email_key UNIQUE (email);


--
-- Name: user_account user_account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_pkey PRIMARY KEY (id);


--
-- Name: url url_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_user_fkey FOREIGN KEY ("user") REFERENCES public.user_account(id);


--
-- PostgreSQL database dump complete
--
