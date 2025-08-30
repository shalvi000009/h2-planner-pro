import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar } from "@/components/layout/PanelShell";
import PanelShell from "@/components/layout/PanelShell";
import { motion } from "framer-motion";
import { 
  Users, 
  Share2, 
  MessageSquare, 
  Calendar,
  MapPin,
  Target,
  Zap,
  Plus,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Heart,
  Reply
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  description: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  updatedAt: string;
  collaborators: number;
  status: 'draft' | 'review' | 'approved' | 'implemented';
  impact: {
    co2Reduction: number;
    jobs: number;
    investment: number;
  };
  tags: string[];
}

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

interface Activity {
  id: string;
  type: 'comment' | 'edit' | 'share' | 'approve';
  user: string;
  userAvatar: string;
  action: string;
  timestamp: string;
  target?: string;
}

const scenarios: Scenario[] = [
  {
    id: "1",
    name: "Coastal Wind Expansion",
    description: "Comprehensive plan for expanding wind energy infrastructure along the Gulf Coast with integrated hydrogen production facilities.",
    author: "Sarah Chen",
    authorAvatar: "/avatars/sarah.jpg",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    collaborators: 8,
    status: 'review',
    impact: {
      co2Reduction: 450000,
      jobs: 1200,
      investment: 850000000
    },
    tags: ['wind', 'coastal', 'hydrogen']
  },
  {
    id: "2",
    name: "Solar Valley Industrial Hub",
    description: "Large-scale solar energy complex with hydrogen electrolysis and industrial applications in the Arizona desert.",
    author: "Michael Rodriguez",
    authorAvatar: "/avatars/michael.jpg",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    collaborators: 12,
    status: 'approved',
    impact: {
      co2Reduction: 320000,
      jobs: 850,
      investment: 620000000
    },
    tags: ['solar', 'industrial', 'desert']
  },
  {
    id: "3",
    name: "Urban Hydrogen Network",
    description: "Distributed hydrogen production and distribution network for urban centers with focus on transportation.",
    author: "Emily Watson",
    authorAvatar: "/avatars/emily.jpg",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-15",
    collaborators: 15,
    status: 'draft',
    impact: {
      co2Reduction: 280000,
      jobs: 650,
      investment: 520000000
    },
    tags: ['urban', 'transport', 'network']
  }
];

const comments: Comment[] = [
  {
    id: "1",
    author: "David Kim",
    authorAvatar: "/avatars/david.jpg",
    content: "Great analysis of the wind patterns. Have you considered the impact of seasonal variations on production capacity?",
    timestamp: "2 hours ago",
    likes: 5,
    replies: []
  },
  {
    id: "2",
    author: "Lisa Park",
    authorAvatar: "/avatars/lisa.jpg",
    content: "The infrastructure requirements look solid. We should also factor in grid connection costs for remote locations.",
    timestamp: "4 hours ago",
    likes: 3,
    replies: [
      {
        id: "2.1",
        author: "Sarah Chen",
        authorAvatar: "/avatars/sarah.jpg",
        content: "Good point! I've updated the cost analysis to include grid infrastructure.",
        timestamp: "1 hour ago",
        likes: 2,
        replies: []
      }
    ]
  }
];

const activities: Activity[] = [
  {
    id: "1",
    type: 'comment',
    user: "David Kim",
    userAvatar: "/avatars/david.jpg",
    action: "commented on Coastal Wind Expansion",
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    type: 'edit',
    user: "Sarah Chen",
    userAvatar: "/avatars/sarah.jpg",
    action: "updated infrastructure costs",
    timestamp: "3 hours ago",
    target: "Coastal Wind Expansion"
  },
  {
    id: "3",
    type: 'share',
    user: "Michael Rodriguez",
    userAvatar: "/avatars/michael.jpg",
    action: "shared Solar Valley scenario",
    timestamp: "1 day ago"
  },
  {
    id: "4",
    type: 'approve',
    user: "Emily Watson",
    userAvatar: "/avatars/emily.jpg",
    action: "approved Solar Valley Industrial Hub",
    timestamp: "2 days ago"
  }
];

const UserCollaboration: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(scenarios[0]);
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState<'scenarios' | 'activity'>('scenarios');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-500';
      case 'review': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'implemented': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'review': return 'In Review';
      case 'approved': return 'Approved';
      case 'implemented': return 'Implemented';
      default: return 'Unknown';
    }
  };

  const copyShareLink = (scenarioId: string) => {
    const link = `${window.location.origin}/scenarios/${scenarioId}`;
    navigator.clipboard.writeText(link);
    // You could add a toast notification here
  };

  return (
    <PanelShell
      title="Collaboration"
      sidebar={<Sidebar items={[
        { label: "Dashboard", href: "/user/dashboard", icon: "activity" },
        { label: "Map Workspace", href: "/user/map", icon: "map" },
        { label: "Recommendations", href: "/user/recommendations", icon: "trending-up" },
        { label: "Impact", href: "/user/impact", icon: "target" },
        { label: "Collaboration", href: "/user/collaboration", icon: "users" },
      ]} />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenarios List */}
        <div className="lg:col-span-1">
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Scenarios
                </CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scenarios.map((scenario, index) => (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-muted/30 ${
                      selectedScenario?.id === scenario.id ? 'bg-muted/50 border-primary' : 'border-border'
                    }`}
                    onClick={() => setSelectedScenario(scenario)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{scenario.name}</h4>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getStatusColor(scenario.status)} text-white`}
                      >
                        {getStatusText(scenario.status)}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {scenario.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={scenario.authorAvatar} />
                          <AvatarFallback>{scenario.author[0]}</AvatarFallback>
                        </Avatar>
                        <span>{scenario.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        <span>{scenario.collaborators}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scenario Details & Comments */}
        <div className="lg:col-span-2 space-y-6">
          {selectedScenario && (
            <>
              {/* Scenario Header */}
              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        {selectedScenario.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Created by {selectedScenario.author} • Updated {selectedScenario.updatedAt}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyShareLink(selectedScenario.id)}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{selectedScenario.description}</p>
                  
                  {/* Impact Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-bold text-primary">
                        {(selectedScenario.impact.co2Reduction / 1000).toFixed(0)}k
                      </div>
                      <div className="text-xs text-muted-foreground">CO₂ Reduction (t)</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-bold text-secondary">
                        {selectedScenario.impact.jobs.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Jobs Created</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-bold text-accent">
                        ${(selectedScenario.impact.investment / 1000000).toFixed(0)}M
                      </div>
                      <div className="text-xs text-muted-foreground">Investment</div>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex gap-2">
                    {selectedScenario.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Comments & Discussion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* New Comment */}
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/avatars/user.jpg" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[80px]"
                        />
                        <div className="flex justify-end mt-2">
                          <Button size="sm">Post Comment</Button>
                        </div>
                      </div>
                    </div>

                    {/* Existing Comments */}
                    <div className="space-y-4">
                      {comments.map((comment, index) => (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="space-y-3"
                        >
                          <div className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={comment.authorAvatar} />
                              <AvatarFallback>{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-muted/30 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-sm">{comment.author}</span>
                                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                              <div className="flex items-center gap-4 mt-2">
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                  <Heart className="h-3 w-3 mr-1" />
                                  {comment.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                  <Reply className="h-3 w-3 mr-1" />
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Replies */}
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3 ml-8">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={reply.authorAvatar} />
                                <AvatarFallback>{reply.author[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-muted/20 rounded-lg p-2">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-xs">{reply.author}</span>
                                    <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                  </div>
                                  <p className="text-xs">{reply.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </PanelShell>
  );
};

export default UserCollaboration;
