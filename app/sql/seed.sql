-- seed.sql
-- Seed data for the database

-- Categories
INSERT INTO categories (name) VALUES 
('Web Development'),
('Mobile Apps'),
('AI & Machine Learning'),
('Design Tools'),
('Productivity');

-- Jobs
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo, company_location, apply_url, job_type, location, salary_range) VALUES
('Frontend Developer', 'We are looking for a skilled frontend developer to join our team.', 'Build responsive web applications, collaborate with designers', 'Minimum 2 years of experience with React', 'Health insurance, flexible working hours', 'React, TypeScript, CSS', 'TechCorp', 'https://example.com/logo1.png', 'San Francisco', 'https://example.com/apply1', 'full-time', 'remote', '$60,000 - $70,000'),
('Mobile Developer', 'Join our mobile team to build cutting-edge apps', 'Develop iOS and Android applications', 'Experience with Swift and Kotlin', '401k, remote work options', 'Swift, Kotlin, Flutter', 'AppMakers', 'https://example.com/logo2.png', 'New York', 'https://example.com/apply2', 'full-time', 'hybrid', '$70,000 - $80,000'),
('UX Designer', 'Help us create beautiful user experiences', 'Design user interfaces and conduct user research', 'Portfolio showing UI/UX work', 'Unlimited PTO, health benefits', 'Figma, Sketch, User Research', 'DesignHub', 'https://example.com/logo3.png', 'Austin', 'https://example.com/apply3', 'part-time', 'on-site', '$50,000 - $60,000'),
('Data Scientist', 'Work with big data to extract insights', 'Build machine learning models and analyze data', 'PhD in Computer Science or related field', 'Stock options, flexible schedule', 'Python, TensorFlow, SQL', 'DataCo', 'https://example.com/logo4.png', 'Boston', 'https://example.com/apply4', 'contract', 'remote', '$80,000 - $90,000'),
('DevOps Engineer', 'Manage our cloud infrastructure', 'Set up CI/CD pipelines and manage AWS resources', '3+ years of experience with AWS', 'Competitive salary, remote work', 'AWS, Docker, Kubernetes', 'CloudTech', 'https://example.com/logo5.png', 'Seattle', 'https://example.com/apply5', 'full-time', 'hybrid', '$70,000 - $80,000');

-- Products
INSERT INTO products (name, tagline, description, how_it_works, icon, url, profile_id, category_id) VALUES
('CodeBuddy', 'Your AI coding assistant', 'CodeBuddy helps you write better code faster with AI suggestions', 'Simply type your code and CodeBuddy will suggest improvements and alternatives', 'https://example.com/codebuddy.png', 'https://codebuddy.app', '9ca790e8-c0af-42c1-9a82-4311511cec9a', 1),
('DesignPal', 'Design made simple', 'DesignPal helps non-designers create beautiful designs', 'Choose a template and customize it with our simple drag-and-drop interface', 'https://example.com/designpal.png', 'https://designpal.io', '9ca790e8-c0af-42c1-9a82-4311511cec9a', 4),
('TaskMaster', 'Productivity on steroids', 'TaskMaster helps you organize your work and life', 'Create tasks, set deadlines, and track your progress with our intuitive interface', 'https://example.com/taskmaster.png', 'https://taskmaster.app', '9ca790e8-c0af-42c1-9a82-4311511cec9a', 5),
('AIWriter', 'Write better content with AI', 'AIWriter helps you create engaging content with AI', 'Enter a topic and AIWriter will generate high-quality content for you', 'https://example.com/aiwriter.png', 'https://aiwriter.co', '9ca790e8-c0af-42c1-9a82-4311511cec9a', 3),
('MobileKit', 'Mobile development made easy', 'MobileKit is a framework for building cross-platform mobile apps', 'Use our SDK to build apps that work on iOS and Android with a single codebase', 'https://example.com/mobilekit.png', 'https://mobilekit.dev', '9ca790e8-c0af-42c1-9a82-4311511cec9a', 2);

-- Reviews
INSERT INTO reviews (product_id, profile_id, rating, review) VALUES
(1, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 5, 'CodeBuddy has transformed the way I write code. Highly recommended!'),
(2, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 4, 'DesignPal is great for quick designs, but could use more templates.'),
(3, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 5, 'TaskMaster has helped me stay organized and productive.'),
(4, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 3, 'AIWriter is good but sometimes generates content that needs heavy editing.'),
(5, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 4, 'MobileKit saved us months of development time.');

-- Product Upvotes
INSERT INTO product_upvotes (product_id, profile_id) VALUES
(1, '9ca790e8-c0af-42c1-9a82-4311511cec9a');

-- Follows (self-follow for demonstration)
INSERT INTO follows (follower_id, following_id) VALUES
('9ca790e8-c0af-42c1-9a82-4311511cec9a', '9ca790e8-c0af-42c1-9a82-4311511cec9a');

-- GPT Ideas
INSERT INTO gpt_ideas (idea, views) VALUES
('A browser extension that summarizes articles with AI', 10),
('A mobile app that helps you learn a language through daily conversations with AI', 15),
('A tool that converts wireframes into code automatically', 20),
('An AI assistant that helps you write better emails', 25),
('A platform for finding remote work opportunities in tech', 30);

-- GPT Ideas Likes
INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id) VALUES
(1, '9ca790e8-c0af-42c1-9a82-4311511cec9a');

-- Topics
INSERT INTO topics (name, slug) VALUES
('Web Development', 'web-development'),
('Mobile Development', 'mobile-development'),
('AI & Machine Learning', 'ai-machine-learning'),
('Design', 'design'),
('Career', 'career');

-- Posts
INSERT INTO posts (title, content, topic_id, profile_id) VALUES
('How to optimize React performance', 'In this post, I will share some tips on how to optimize your React applications...', 1, '9ca790e8-c0af-42c1-9a82-4311511cec9a'),
('Building your first iOS app with Swift', 'Swift is a powerful language for iOS development. Here''s how to get started...', 2, '9ca790e8-c0af-42c1-9a82-4311511cec9a'),
('Introduction to Machine Learning', 'Machine learning is transforming industries. Let''s explore the basics...', 3, '9ca790e8-c0af-42c1-9a82-4311511cec9a'),
('Principles of good UI design', 'Good UI design is essential for user engagement. Here are some principles to follow...', 4, '9ca790e8-c0af-42c1-9a82-4311511cec9a'),
('How to land your first developer job', 'Breaking into the industry can be challenging. Here are some tips...', 5, '9ca790e8-c0af-42c1-9a82-4311511cec9a');

-- Post Upvotes
INSERT INTO post_upvotes (post_id, profile_id) VALUES
(1, '9ca790e8-c0af-42c1-9a82-4311511cec9a');

-- Post Replies
INSERT INTO post_replies (post_id, profile_id, reply) VALUES
(1, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'Great post! I also recommend using React.memo for functional components.'),
(2, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'Swift is indeed a great language. I would also recommend checking out SwiftUI.'),
(3, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'This is a great introduction! Would love to see more advanced topics.'),
(4, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'These principles are spot on. I would add that consistency is also key.'),
(5, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'Building a portfolio is also crucial for landing that first job.');

-- Teams
INSERT INTO team (product_name, product_stage, team_size, equity_split, roles, product_description) VALUES
('CodeCollab', 'prototype', 3, 33, 'Developer, Designer, Marketer', 'A collaborative coding platform for remote teams'),
('HealthTracker', 'mvp', 2, 50, 'Developer, Health Expert', 'An app to track health metrics and provide insights'),
('EduLearn', 'idea', 4, 25, 'Developer, Designer, Content Creator, Educator', 'An interactive learning platform for K-12 students'),
('FinPlan', 'launched', 3, 33, 'Developer, Financial Expert, Marketer', 'A financial planning tool for millennials'),
('EcoShop', 'mvp', 2, 50, 'Developer, Sustainability Expert', 'A marketplace for eco-friendly products');

-- Later
-- Message Rooms
INSERT INTO message_rooms DEFAULT VALUES;

-- Message Room Members
INSERT INTO message_room_members (message_room_id, profile_id) VALUES
(1, '9ca790e8-c0af-42c1-9a82-4311511cec9a');

-- Messages
INSERT INTO messages (message_room_id, sender_id, content) VALUES
(1, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'Hello! How are you doing?'),
(1, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'I wanted to discuss our project'),
(1, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'When are you available for a call?'),
(1, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'I have some new ideas to share'),
(1, '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'Let me know what you think');

-- Notifications
INSERT INTO notifications (source_id, target_id, type, message) VALUES
('9ca790e8-c0af-42c1-9a82-4311511cec9a', '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'follow', 'User started following you'),
('9ca790e8-c0af-42c1-9a82-4311511cec9a', '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'review', 'User reviewed your product'),
('9ca790e8-c0af-42c1-9a82-4311511cec9a', '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'reply', 'User replied to your post'),
('9ca790e8-c0af-42c1-9a82-4311511cec9a', '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'mention', 'User mentioned you in a post'),
('9ca790e8-c0af-42c1-9a82-4311511cec9a', '9ca790e8-c0af-42c1-9a82-4311511cec9a', 'follow', 'Another user started following you'); 