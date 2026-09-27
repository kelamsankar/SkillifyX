import streamlit as st
import pandas as pd
import numpy as np

st.set_page_config(page_title="SkillifyX", page_icon="🚀", layout="wide")

st.markdown("""
<style>
.stApp{background:linear-gradient(135deg,#050505 0%,#120019 50%,#050505 100%);color:white}
.block-container{padding-top:2rem;max-width:1400px}
h1,h2,h3,h4{color:white!important}
p,label,span{color:#e5e5e5}
section[data-testid="stSidebar"]{background:#090909;border-right:1px solid #292929}
.stButton>button{width:100%;border-radius:10px;border:1px solid #6f1b72;background:linear-gradient(90deg,#5b176d,#9b2fae);color:white;font-weight:600}
.card{background:rgba(20,20,25,.95);border:1px solid #34233b;border-radius:18px;padding:25px;margin-bottom:20px}
.hero{padding:60px 20px;text-align:center;background:radial-gradient(circle at top,#42114d 0%,#110014 45%,#050505 100%);border-radius:25px;margin-bottom:30px}
.hero-title{font-size:58px;font-weight:800;background:linear-gradient(90deg,#fff,#ff54d6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-subtitle{font-size:20px;color:#cfcfcf;max-width:800px;margin:auto}
.metric-card{background:#151218;border:1px solid #36233c;border-radius:15px;padding:20px;text-align:center}
</style>
""", unsafe_allow_html=True)

if "page" not in st.session_state: st.session_state.page = "Home"
if "logged_in" not in st.session_state: st.session_state.logged_in = False
if "username" not in st.session_state: st.session_state.username = ""

with st.sidebar:
    st.markdown("# 🚀 SkillifyX")
    st.caption("Career & Startup Intelligence")
    st.divider()
    for label, page in [("🏠 Home","Home"),("🎯 SkillSync","SkillSync"),("🚀 Startify","Startify"),("📊 Analytics","Analytics")]:
        if st.button(label): st.session_state.page = page
    st.divider()
    if not st.session_state.logged_in:
        if st.button("🔐 Login"): st.session_state.page = "Login"
        if st.button("📝 Sign Up"): st.session_state.page = "Signup"
    else:
        st.success(f"Welcome, {st.session_state.username}")
        if st.button("🚪 Logout"):
            st.session_state.logged_in=False
            st.session_state.username=""
            st.session_state.page="Home"
            st.rerun()

def home_page():
    st.markdown("""<div class="hero"><div class="hero-title">SkillifyX</div>
    <p class="hero-subtitle">Discover your skills. Explore career opportunities. Understand the startup ecosystem.</p></div>""", unsafe_allow_html=True)
    st.markdown("## Everything you need to plan your future")
    cols=st.columns(3)
    cards=[
        ("🎯 SkillSync","Analyze your skills and compare them with industry requirements.",["Skill gap analysis","In-demand skills","Career insights","Job market analysis"],"SkillSync"),
        ("🚀 Startify","Explore startup industries, funding trends, and emerging business opportunities.",["Startup trends","Funding analysis","Startup hubs","Location insights"],"Startify"),
        ("📊 Analytics","Explore job market and skill-related data through interactive analytics.",["Salary analysis","Job roles","Experience levels","Top skills"],"Analytics")]
    for col,(title,desc,items,page) in zip(cols,cards):
        with col:
            st.markdown(f'<div class="card"><h2>{title}</h2><p>{desc}</p><ul>{"".join(f"<li>{x}</li>" for x in items)}</ul></div>',unsafe_allow_html=True)
            if st.button(f"Explore {title.split(' ',1)[1]}",key=f"home_{page}"): st.session_state.page=page
    st.markdown("## Why SkillifyX?")
    for col,(icon,text) in zip(st.columns(4),[("🎯","Skill Analysis"),("💼","Career Insights"),("🚀","Startup Insights"),("📊","Data Visualization")]):
        with col: st.markdown(f'<div class="metric-card"><div style="font-size:35px">{icon}</div><div>{text}</div></div>',unsafe_allow_html=True)

def login_page():
    st.markdown("## 🔐 Login")
    _,col,_=st.columns([1,2,1])
    with col:
        with st.form("login"):
            email=st.text_input("Email"); password=st.text_input("Password",type="password")
            if st.form_submit_button("Login"):
                if email and password:
                    st.session_state.logged_in=True; st.session_state.username=email.split("@")[0]; st.session_state.page="Home"; st.rerun()
                else: st.error("Please enter email and password.")

def signup_page():
    st.markdown("## 📝 Create Account")
    _,col,_=st.columns([1,2,1])
    with col:
        with st.form("signup"):
            name=st.text_input("Full Name"); email=st.text_input("Email")
            password=st.text_input("Password",type="password"); confirm=st.text_input("Confirm Password",type="password")
            if st.form_submit_button("Create Account"):
                if not name or not email or not password: st.error("Please fill all fields.")
                elif password!=confirm: st.error("Passwords do not match.")
                else: st.success("Account created successfully!")

def skillsync_page():
    st.markdown("# 🎯 SkillSync")
    st.markdown('<div class="card"><h3>Skill Gap Analyzer</h3><p>Enter your skills to understand areas to improve based on industry requirements.</p></div>',unsafe_allow_html=True)
    skills=st.multiselect("Select your current skills",["Python","SQL","Machine Learning","Power BI","Excel","Pandas","NumPy","Java","JavaScript","React","Node.js","MongoDB","MySQL","Git","Data Visualization"])
    target=st.selectbox("Select your target role",["Data Analyst","Data Scientist","Machine Learning Engineer","Software Developer","Business Analyst","AI Engineer"])
    if st.button("🔍 Analyze My Skills"):
        role_skills={
            "Data Analyst":["Python","SQL","Power BI","Excel","Pandas","Data Visualization"],
            "Data Scientist":["Python","SQL","Pandas","NumPy","Machine Learning"],
            "Machine Learning Engineer":["Python","Machine Learning","NumPy","Pandas","Git"],
            "Software Developer":["JavaScript","React","Node.js","Git","SQL"],
            "Business Analyst":["Excel","SQL","Power BI","Data Visualization"],
            "AI Engineer":["Python","Machine Learning","Git","SQL"]}
        required=role_skills[target]; current=set(skills)
        matched=[x for x in required if x in current]; missing=[x for x in required if x not in current]
        a,b,c=st.columns(3); a.metric("Required Skills",len(required)); b.metric("Matched Skills",len(matched)); c.metric("Skill Gaps",len(missing))
        st.markdown("### ✅ Matched Skills"); st.success(", ".join(matched) if matched else "No matching skills found.")
        st.markdown("### 📚 Skills to Improve")
        for skill in missing: st.info(f"Learn **{skill}**")
    st.divider(); st.markdown("## 📊 Power BI Dashboard")
    url=st.text_input("Power BI Embed URL",placeholder="https://app.powerbi.com/view?r=...")
    if url: st.components.v1.iframe(url,height=650,scrolling=True)

def startify_page():
    st.markdown("# 🚀 Startify")
    st.markdown('<div class="card"><h3>Startup Intelligence</h3><p>Explore startup industries, funding patterns, locations, and emerging opportunities.</p></div>',unsafe_allow_html=True)
    a,b=st.columns(2)
    with a: industry=st.selectbox("Select Industry",["Technology","FinTech","HealthTech","EdTech","E-Commerce","AI & ML","SaaS","Agriculture"])
    with b: location=st.selectbox("Select Location",["Bangalore","Hyderabad","Chennai","Delhi","Mumbai","Pune","Other"])
    if st.button("🔎 Explore Startup Opportunities"):
        a,b,c=st.columns(3); a.metric("Industry",industry); b.metric("Location",location); c.metric("Opportunity","High")
        st.success(f"{industry} startups in {location} can be explored using the available market data.")
    st.markdown("## 📊 Startup Analytics")
    df=pd.DataFrame({"Industry":["Technology","FinTech","HealthTech","EdTech","AI & ML","SaaS"],"Startups":[420,280,210,180,350,300]})
    st.bar_chart(df.set_index("Industry"))

def analytics_page():
    st.markdown("# 📊 Job Market Analytics")
    df=pd.DataFrame({"Job Role":["Data Analyst","Data Scientist","Software Engineer","ML Engineer","Business Analyst","Data Analyst","Software Engineer","Data Scientist"],
                     "Location":["Bangalore","Hyderabad","Bangalore","Chennai","Hyderabad","Pune","Mumbai","Bangalore"],
                     "Experience":["Entry Level","Mid Level","Entry Level","Mid Level","Entry Level","Entry Level","Senior Level","Mid Level"],
                     "Salary":[5.5,10,7,11,6,5,15,12]})
    a,b,c,d=st.columns(4); a.metric("Total Jobs",len(df)); b.metric("Job Roles",df["Job Role"].nunique()); c.metric("Locations",df["Location"].nunique()); d.metric("Avg Salary",f"{df.Salary.mean():.1f} LPA")
    st.markdown("## 💼 Job Role Distribution"); st.bar_chart(df["Job Role"].value_counts())
    st.markdown("## 📍 Jobs by Location"); st.bar_chart(df["Location"].value_counts())
    st.markdown("## 💰 Average Salary by Role"); st.bar_chart(df.groupby("Job Role")["Salary"].mean().sort_values(ascending=False))
    st.markdown("## 🎓 Experience Level"); st.bar_chart(df["Experience"].value_counts())
    st.markdown("## 📋 Dataset"); st.dataframe(df,use_container_width=True)

pages={"Home":home_page,"Login":login_page,"Signup":signup_page,"SkillSync":skillsync_page,"Startify":startify_page,"Analytics":analytics_page}
pages[st.session_state.page]()

st.markdown("---")
st.markdown('<div style="text-align:center;color:#777;">SkillifyX • Career & Startup Intelligence Platform</div>',unsafe_allow_html=True)
