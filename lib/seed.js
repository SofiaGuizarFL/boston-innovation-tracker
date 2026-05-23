// Run with: node lib/seed.js
// Make sure to set MONGODB_URI in your .env.local first

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

const CompanySchema = new mongoose.Schema({
  name: String,
  headquarters_location: String,
  industry: String,
  founded_year: Number,
  employee_size: String,
  description: String,
  website_url: String,
  logo_url: String,
  tags: [String],
  featured: Boolean,
}, { timestamps: true });

const IndustrySchema = new mongoose.Schema({
  industry_name: String,
  description: String,
  icon: String,
});

const Company = mongoose.models.Company || mongoose.model('Company', CompanySchema);
const Industry = mongoose.models.Industry || mongoose.model('Industry', IndustrySchema);

const industries = [
  { industry_name: 'Software & SaaS', description: 'Software-as-a-service and enterprise software companies', icon: '💻' },
  { industry_name: 'Healthcare Technology', description: 'Digital health, medtech, and health IT companies', icon: '🏥' },
  { industry_name: 'Artificial Intelligence', description: 'AI, machine learning, and data science companies', icon: '🤖' },
  { industry_name: 'Fintech', description: 'Financial technology and payments companies', icon: '💳' },
  { industry_name: 'Biotech', description: 'Biotechnology and life sciences companies', icon: '🧬' },
  { industry_name: 'Cybersecurity', description: 'Information security and privacy companies', icon: '🔐' },
  { industry_name: 'E-Commerce', description: 'Online retail and marketplace companies', icon: '🛒' },
  { industry_name: 'EdTech', description: 'Education technology companies', icon: '📚' },
];

const companies = [
  {
    name: 'HubSpot',
    headquarters_location: 'Cambridge, MA',
    industry: 'Software & SaaS',
    founded_year: 2006,
    employee_size: '5000+',
    description: 'HubSpot is a leading CRM platform that provides software and support to help businesses grow better. It offers tools for marketing, sales, customer service, and content management.',
    website_url: 'https://www.hubspot.com',
    logo_url: 'https://logo.clearbit.com/hubspot.com',
    tags: ['CRM', 'Marketing', 'Sales', 'SaaS'],
    featured: true,
  },
  {
    name: 'Wayfair',
    headquarters_location: 'Boston, MA',
    industry: 'E-Commerce',
    founded_year: 2002,
    employee_size: '5000+',
    description: 'Wayfair is one of the world\'s largest online destinations for the home. Through technology and innovation, Wayfair makes it possible for shoppers to quickly and easily find exactly what they want.',
    website_url: 'https://www.wayfair.com',
    logo_url: 'https://logo.clearbit.com/wayfair.com',
    tags: ['E-Commerce', 'Furniture', 'Home Goods'],
    featured: true,
  },
  {
    name: 'DraftKings',
    headquarters_location: 'Boston, MA',
    industry: 'Fintech',
    founded_year: 2012,
    employee_size: '1001-5000',
    description: 'DraftKings is a digital sports entertainment and gaming company. It offers daily fantasy sports, sports betting, and online casino gaming across the United States.',
    website_url: 'https://www.draftkings.com',
    logo_url: 'https://logo.clearbit.com/draftkings.com',
    tags: ['Sports Betting', 'Fantasy Sports', 'Gaming'],
    featured: true,
  },
  {
    name: 'Rapid7',
    headquarters_location: 'Boston, MA',
    industry: 'Cybersecurity',
    founded_year: 2000,
    employee_size: '1001-5000',
    description: 'Rapid7 is a cybersecurity company that provides security analytics and automation solutions that help organizations detect threats, investigate attacks, and act quickly.',
    website_url: 'https://www.rapid7.com',
    logo_url: 'https://logo.clearbit.com/rapid7.com',
    tags: ['Security', 'Analytics', 'Threat Detection'],
    featured: false,
  },
  {
    name: 'Chewy',
    headquarters_location: 'Boston, MA',
    industry: 'E-Commerce',
    founded_year: 2011,
    employee_size: '5000+',
    description: 'Chewy is an online retailer of pet food and other pet-related products. The company delivers a wide selection of products with a focus on customer service.',
    website_url: 'https://www.chewy.com',
    logo_url: 'https://logo.clearbit.com/chewy.com',
    tags: ['E-Commerce', 'Pets', 'Retail'],
    featured: false,
  },
  {
    name: 'Drift',
    headquarters_location: 'Boston, MA',
    industry: 'Software & SaaS',
    founded_year: 2015,
    employee_size: '201-500',
    description: 'Drift is a conversational marketing and sales platform that helps companies grow by connecting them with the best leads in real-time using AI-powered chatbots.',
    website_url: 'https://www.drift.com',
    logo_url: 'https://logo.clearbit.com/drift.com',
    tags: ['Chatbot', 'Marketing', 'Sales', 'AI'],
    featured: false,
  },
  {
    name: 'Brightcove',
    headquarters_location: 'Boston, MA',
    industry: 'Software & SaaS',
    founded_year: 2004,
    employee_size: '501-1000',
    description: 'Brightcove is a cloud-based online video platform. It helps businesses publish, distribute, and monetize video content across multiple devices and platforms.',
    website_url: 'https://www.brightcove.com',
    logo_url: 'https://logo.clearbit.com/brightcove.com',
    tags: ['Video', 'Cloud', 'Media'],
    featured: false,
  },
  {
    name: 'Formlabs',
    headquarters_location: 'Somerville, MA',
    industry: 'Artificial Intelligence',
    founded_year: 2011,
    employee_size: '501-1000',
    description: 'Formlabs is a 3D printing company that develops professional desktop 3D printers. It creates hardware, software, and materials for designers, engineers, and manufacturers.',
    website_url: 'https://formlabs.com',
    logo_url: 'https://logo.clearbit.com/formlabs.com',
    tags: ['3D Printing', 'Hardware', 'Manufacturing'],
    featured: false,
  },
  {
    name: 'Salsify',
    headquarters_location: 'Boston, MA',
    industry: 'Software & SaaS',
    founded_year: 2012,
    employee_size: '201-500',
    description: 'Salsify is a product experience management platform that helps brands and retailers create, manage, and syndicate compelling product content across digital channels.',
    website_url: 'https://www.salsify.com',
    logo_url: 'https://logo.clearbit.com/salsify.com',
    tags: ['E-Commerce', 'Product Management', 'SaaS'],
    featured: false,
  },
  {
    name: 'EverCommerce',
    headquarters_location: 'Boston, MA',
    industry: 'Software & SaaS',
    founded_year: 2016,
    employee_size: '1001-5000',
    description: 'EverCommerce is a service commerce platform providing vertically-tailored, integrated SaaS solutions designed to streamline and simplify operations for service-based businesses.',
    website_url: 'https://www.evercommerce.com',
    logo_url: 'https://logo.clearbit.com/evercommerce.com',
    tags: ['SaaS', 'Service Commerce', 'SMB'],
    featured: false,
  },
  {
    name: 'Kyruus',
    headquarters_location: 'Boston, MA',
    industry: 'Healthcare Technology',
    founded_year: 2010,
    employee_size: '201-500',
    description: 'Kyruus provides data-driven provider search and scheduling solutions that help health systems match patients with the right providers across all access points.',
    website_url: 'https://www.kyruus.com',
    logo_url: 'https://logo.clearbit.com/kyruus.com',
    tags: ['Healthcare', 'Patient Matching', 'Scheduling'],
    featured: false,
  },
  {
    name: 'Cognex',
    headquarters_location: 'Natick, MA',
    industry: 'Artificial Intelligence',
    founded_year: 1981,
    employee_size: '1001-5000',
    description: 'Cognex is a leading provider of machine vision systems, software, sensors, and industrial ID readers used in manufacturing automation to identify, inspect, and guide products.',
    website_url: 'https://www.cognex.com',
    logo_url: 'https://logo.clearbit.com/cognex.com',
    tags: ['Machine Vision', 'AI', 'Manufacturing'],
    featured: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Company.deleteMany({});
    await Industry.deleteMany({});
    console.log('Cleared existing data');

    await Industry.insertMany(industries);
    console.log(`Seeded ${industries.length} industries`);

    await Company.insertMany(companies);
    console.log(`Seeded ${companies.length} companies`);

    console.log('✅ Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
