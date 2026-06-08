-- ============================================================
-- LOAKIM INTEGRATED SERVICES - NEON POSTGRESQL SCHEMA
-- ============================================================
-- Run this in your Neon SQL Editor after creating a project
-- This schema removes all Supabase-specific dependencies

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. SERVICES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text,
  sub_services jsonb DEFAULT '[]',
  icon text,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================
-- 2. CASE STUDIES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  sector text NOT NULL,
  metric_value text NOT NULL,
  metric_label text NOT NULL,
  description text,
  services_used text[] DEFAULT '{}',
  image_url text,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================
-- 3. CONSULTATIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company_name text,
  selected_services text[] NOT NULL DEFAULT '{}',
  budget_range text,
  timeline text,
  project_details text,
  status text DEFAULT 'new',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================
-- 4. SITE CONTENT TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

-- ============================================================
-- 5. PROFILES TABLE (Auth-agnostic — works with Clerk/any auth)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  external_auth_id text UNIQUE,  -- Clerk user ID, Auth0 sub, etc.
  full_name text,
  company_name text,
  role text DEFAULT 'client',
  avatar_url text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(is_featured);
CREATE INDEX IF NOT EXISTS idx_case_studies_active ON case_studies(is_active);
CREATE INDEX IF NOT EXISTS idx_consultations_email ON consultations(email);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(section_key);
CREATE INDEX IF NOT EXISTS idx_profiles_auth ON profiles(external_auth_id);

-- ============================================================
-- TRIGGER: Auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON case_studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- SEED DATA: SERVICES
-- ============================================================
INSERT INTO services (title, category, description, sub_services, order_index) VALUES
('Brand Audit & Health Assessment', 'brand-strategy', 'Comprehensive evaluation of brand equity, positioning, and competitive landscape.', '["Identity Audit", "Messaging Review", "Competitive Analysis"]', 1),
('Brand Positioning & Messaging', 'brand-strategy', 'Crafting distinctive market positions and messaging architectures.', '["Market Positioning", "Value Proposition", "Messaging Framework"]', 2),
('Visual Identity & Brand Design', 'brand-strategy', 'Logo systems, brand guidelines, packaging design, and complete visual ecosystems.', '["Logo Design", "Brand Guidelines", "Packaging"]', 3),
('Brand Architecture & Portfolio', 'brand-strategy', 'Structuring multi-brand portfolios for clarity and maximum market coverage.', '["Portfolio Strategy", "Brand Hierarchy", "Naming Architecture"]', 4),
('Employer Brand Strategy', 'brand-strategy', 'Building internal brand culture that attracts and retains top talent.', '["EVP Development", "Internal Communications", "Culture Mapping"]', 5),
('Merchandising Strategy & VM', 'retail-marketing', 'Planogram development, in-store visual strategy, and shelf optimisation.', '["Planogram Design", "Shelf Optimisation", "Seasonal VM"]', 6),
('Sales Activation & Promotions', 'retail-marketing', 'Promotional mechanics design and in-store activation planning.', '["Promo Mechanics", "Field Team Coordination", "Trade Marketing"]', 7),
('BTL & Experiential Marketing', 'retail-marketing', 'Experiential marketing, POS/POP materials, and roadshows.', '["Experiential Events", "POS Materials", "Roadshows"]', 8),
('Social Media Strategy & Management', 'digital-marketing', 'Platform strategy, content calendars, and influencer campaigns.', '["Platform Strategy", "Content Calendar", "Influencer Management"]', 9),
('SEO, SEM & Performance Marketing', 'digital-marketing', 'Search engine optimisation, Google Ads, and email marketing.', '["SEO Audit", "Google Ads", "Email/SMS Campaigns"]', 10),
('AI-Powered Marketing & Content', 'digital-marketing', 'Generative AI for content, market research, and automation.', '["Gen AI Content", "Trend Analysis", "Marketing Automation"]', 11),
('Event Marketing & Activations', 'events', 'End-to-end event production for brand launches and activations.', '["Brand Launches", "Trade Events", "Consumer Activations"]', 12),
('Project & Campaign Management', 'events', 'Full campaign project management from brief to post-mortem.', '["Project Planning", "Budget Tracking", "Agency Coordination"]', 13);

-- ============================================================
-- SEED DATA: CASE STUDIES
-- ============================================================
INSERT INTO case_studies (client_name, sector, metric_value, metric_label, description, services_used, display_order, is_featured) VALUES
('Healthcare Retail Chain', 'Pharmaceutical / Retail', '₦126M', 'H1 Revenue Generated', 'Developed and executed an integrated retail marketing programme combining in-store activations, digital demand generation, and brand repositioning across 40+ retail locations.', ARRAY['Retail Activation', 'Digital Marketing', 'Brand Strategy'], 1, true),
('FMCG Brand', 'Consumer Goods', '+42%', 'In-Store Conversion', 'Designed and deployed a comprehensive trade marketing programme with retail visibility upgrades, staff training, and mystery shopping audits across modern trade channels.', ARRAY['Trade Marketing', 'Retail Audits', 'Merchandising'], 2, true),
('E-Commerce Platform', 'Technology / Retail', '3.2x', 'Return on Ad Spend', 'Built and optimised a full-funnel digital acquisition strategy including paid social, Google Ads, SEO, and email lifecycle campaigns driving sustainable revenue growth.', ARRAY['Paid Media', 'SEO', 'Email Marketing'], 3, true),
('Education Provider', 'EdTech', '+67%', 'Social Media Growth', 'Created a brand-led social media strategy with content calendars, community management, and influencer partnerships that dramatically expanded digital reach.', ARRAY['Social Strategy', 'Content Marketing', 'Brand Management'], 4, true);

-- ============================================================
-- SEED DATA: SITE CONTENT
-- ============================================================
INSERT INTO site_content (section_key, content) VALUES
('hero', '{"title": "We don''t just build awareness — we build sales.", "subtitle": "Every strategy, campaign, and activation we deliver is anchored in commercial outcomes."}'),
('impact_stats', '{"stats": [{"value": "₦126M", "label": "Revenue Generated H1 2024", "sector": "Healthcare / Retail"}, {"value": "+42%", "label": "In-Store Conversion Uplift", "sector": "FMCG"}, {"value": "3.2x", "label": "ROAS on Digital Campaigns", "sector": "E-Commerce"}, {"value": "18", "label": "Brand Launches Delivered", "sector": "Cross-Sector"}, {"value": "+67%", "label": "Social Media Growth", "sector": "Lifestyle"}]}'),
('consult_cta', '{"title": "Ready to Build Something Real?", "subtitle": "Start with our free Brand Diagnostic — a 45-minute strategic assessment that maps your growth trajectory."}');
