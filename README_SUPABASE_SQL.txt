-- Supabase SQL for 'listings' table
create extension if not exists "uuid-ossp";
create table listings (
  id uuid primary key default uuid_generate_v4(),
  title text,
  title_fa text,
  chemical_name text,
  chemical_name_fa text,
  grade text,
  price text,
  currency text,
  quantity text,
  description text,
  description_fa text,
  created_at timestamptz default now()
);
