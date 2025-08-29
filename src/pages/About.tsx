import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Database, Award, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";

const About = () => {
  const teamMembers = [
    { name: "Dr. Sarah Chen", role: "Lead Developer", expertise: "GIS & Energy Systems" },
    { name: "Michael Rodriguez", role: "Data Scientist", expertise: "Machine Learning & Optimization" },
    { name: "Emma Williams", role: "UI/UX Designer", expertise: "Interactive Visualization" },
    { name: "James Park", role: "Backend Engineer", expertise: "Infrastructure & Scalability" }
  ];

  const datasets = [
    { name: "European Renewable Energy Atlas", source: "EU Open Data Portal", records: "50,000+" },
    { name: "Global Hydrogen Projects Database", source: "IEA", records: "2,500+" },
    { name: "Industrial Demand Centers", source: "Eurostat", records: "10,000+" },
    { name: "Pipeline Infrastructure Network", source: "ENTSOG", records: "15,000+" }
  ];

  const achievements = [
    { value: "95%", label: "Prediction Accuracy" },
    { value: "50+", label: "Cities Analyzed" },
    { value: "200ms", label: "Response Time" },
    { value: "A+", label: "Sustainability Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            About <span className="gradient-text">H2 Infrastructure</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Accelerating the transition to clean hydrogen energy through intelligent infrastructure planning
          </p>
        </div>

        {/* Mission Section */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <Target className="h-8 w-8 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                We're building the most comprehensive hydrogen infrastructure mapping and optimization platform 
                to support the global transition to clean energy. Our AI-powered system analyzes renewable energy 
                potential, demand patterns, and existing infrastructure to recommend optimal placement of hydrogen 
                facilities, maximizing environmental impact while minimizing costs.
              </p>
              <p className="text-muted-foreground">
                By 2030, we aim to facilitate the development of hydrogen infrastructure that will avoid 
                10 million tons of CO₂ emissions annually and create thousands of green jobs across Europe.
              </p>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Platform Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold gradient-text mb-2">{achievement.value}</div>
                <div className="text-sm text-muted-foreground">{achievement.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Database className="h-6 w-6" />
            Technology & Data
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Leaflet</Badge>
                <Badge variant="outline">TensorFlow.js</Badge>
                <Badge variant="outline">WebGL</Badge>
                <Badge variant="outline">Node.js</Badge>
                <Badge variant="outline">PostgreSQL</Badge>
                <Badge variant="outline">Redis</Badge>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">AI Capabilities</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Multi-criteria decision analysis (MCDA)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Geospatial optimization algorithms
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Demand forecasting with ML models
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Real-time scenario simulation
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Data Sources */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Data Sources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {datasets.map((dataset, index) => (
              <div key={index} className="flex items-start justify-between p-4 bg-card/50 rounded-lg">
                <div>
                  <h4 className="font-semibold">{dataset.name}</h4>
                  <p className="text-sm text-muted-foreground">Source: {dataset.source}</p>
                </div>
                <Badge variant="secondary">{dataset.records}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Team Section */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="h-6 w-6" />
            Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center p-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-3"></div>
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <Badge variant="outline" className="mt-2 text-xs">{member.expertise}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Future Vision */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <Award className="h-8 w-8 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Future Vision</h2>
              <p className="text-muted-foreground mb-4">
                We're continuously expanding our platform capabilities to include:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  Real-time monitoring of operational hydrogen facilities
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  Integration with IoT sensors for live data feeds
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  Blockchain-based carbon credit tracking
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  Advanced weather pattern analysis for renewable energy optimization
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Contact Section */}
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground mb-6">
            Interested in collaboration or have questions about our platform?
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <Button variant="energy">
              <ExternalLink className="h-4 w-4 mr-2" />
              Contact Us
            </Button>
            <Button variant="outline">
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </Button>
          </div>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default About;