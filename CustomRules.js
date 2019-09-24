import System;
import System.Windows.Forms;
import Fiddler;

// INTRODUCTION
//
// Well, hello there!
//
// Don't be scared! :-)
//
// This is the FiddlerScript Rules file, which creates some of the menu commands and
// other features of Fiddler. You can edit this file to modify or add new commands.
//
// The original version of this file is named SampleRules.js and it is in the
// \Program Files\Fiddler\ folder. When Fiddler first runs, it creates a copy named
// CustomRules.js inside your \Documents\Fiddler2\Scripts folder. If you make a 
// mistake in editing this file, simply delete the CustomRules.js file and restart
// Fiddler. A fresh copy of the default rules will be created from the original
// sample rules file.

// The best way to edit this file is to install the FiddlerScript Editor, part of
// the free SyntaxEditing addons. Get it here: http://fiddler2.com/r/?SYNTAXVIEWINSTALL

// GLOBALIZATION NOTE: Save this file using UTF-8 Encoding.

// JScript.NET Reference
// http://fiddler2.com/r/?msdnjsnet
//
// FiddlerScript Reference
// http://fiddler2.com/r/?fiddlerscriptcookbook

class Handlers
{
    // ****************
    //
    // This is the Handlers class. Pretty much everything you ever add to FiddlerScript
    // belongs right inside here, or inside one of the already-existing functions below.
    //
  

    // The following snippet demonstrates a custom-bound column for the Web Sessions list.
    // See http://fiddler2.com/r/?fiddlercolumns for more info
    /*
    public static BindUIColumn("Method", 60)
    function FillMethodColumn(oS: Session): String {
    return oS.RequestMethod;
    }
    */

    // The following snippet demonstrates how to create a custom tab that shows simple text
    /*
    public BindUITab("Flags")
    static function FlagsReport(arrSess: Session[]):String {
    
        
    var oSB: System.Text.StringBuilder = new System.Text.StringBuilder();
    for (var i:int = 0; i<arrSess.Length; i++)
    {
    oSB.AppendLine("SESSION FLAGS");
    oSB.AppendFormat("{0}: {1}\n", arrSess[i].id, arrSess[i].fullUrl);
    for(var sFlag in arrSess[i].oFlags)
    {
    oSB.AppendFormat("\t{0}:\t\t{1}\n", sFlag.Key, sFlag.Value);
    }
    }
    return oSB.ToString();
    }
    
    */
        
        
  
    // You can create a custom menu like so:
    static var num = 10;
    //static var count = 0;
    //static var ipArray = new Array("121.225.150.","114.234.112.","114.227.66.","121.238.190.","222.184.136.","49.88.134.","222.188.85.","117.95.30.","49.70.20.","114.233.22.","222.49.210.","222.189.134.","222.191.179.");
    QuickLinkMenu("&点一下就变哦") 
    QuickLinkItem("点我改变IP尾数","ip")
   // QuickLinkItem("下一个地址IP","nextIp")
    public static function DoLinksMenu(sText: String, sAction: String)      //分别对应上面的选项和值
    {
        if(sAction.Equals("ip")){
            var random = new Random(System.DateTime.Now.Millisecond);
            num = (int)((random.NextDouble()+0.001)*250);
        }
      /*  if(sAction.Equals("nextIp")){
            m_IP = ipArray[count];
            count=count+1;
            FiddlerObject.log("ip is change to count :"+count);
        }  */
    }
    
   
 
    public static RulesOption("Hide 304s")
    BindPref("fiddlerscript.rules.Hide304s")
    var m_Hide304s: boolean = false;

    // Cause Fiddler to override the Accept-Language header with one of the defined values
    public static RulesOption("Request &Japanese Content")
    var m_Japanese: boolean = false;

    // Automatic Authentication
    public static RulesOption("&Automatically Authenticate")
    BindPref("fiddlerscript.rules.AutoAuth")
    var m_AutoAuth: boolean = false;
      
    // Cause Fiddler to delay HTTP traffic to simulate typical 56k modem conditions
    public static RulesOption("Simulate &Modem Speeds", "Per&formance")
    var m_SimulateModem: boolean = false;

    // Removes HTTP-caching related headers and specifies "no-cache" on requests and responses
    public static RulesOption("&Disable Caching", "Per&formance")
    var m_DisableCaching: boolean = false;

    public static RulesOption("Cache Always &Fresh", "Per&formance")
    var m_AlwaysFresh: boolean = false;
    
    
        
	// Cause Fiddler to override the User-Agent header with one of the defined values
	// The page http://browserscope2.org/browse?category=selectors&ua=Mobile%20Safari is a good place to find updated versions of these
	RulesString("&User-Agents", true) 
	RulesStringValue(25,"PcWechat", "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 MicroMessenger/6.5.2.501 NetType/WIFI WindowsWechat")
	RulesStringValue(26,"&Custom...", "%CUSTOM%")
	RulesStringValue(24,"Honor 6", "Mozilla/5.0 (Linux; Android 5.1.1; H60-L02 Build/HDH60-L02; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044408 Mobile Safari/537.36 MMWEBID/3934 MicroMessenger/7.0.1380(0x27000038) Process/tools NetType/WIFI Language/zh_CN",true)
	public static var sUA: String = null;
    	
    // Force a manual reload of the script file.  Resets all
    // RulesOption variables to their defaults.
    public static ToolsAction("Reset Script")
    function DoManualReload() { 
        FiddlerObject.ReloadScript();
    }

	
	/*
    public static ContextAction("Decode Selected Sessions")
    function DoRemoveEncoding(oSessions: Session[]) {
        for (var x:int = 0; x < oSessions.Length; x++){
            oSessions[x].utilDecodeRequest();
            oSessions[x].utilDecodeResponse();
        }
        UI.actUpdateInspector(true,true);
    }
   */
	public static ContextAction("重置")
    function cacleAll(oSessions: Session[]) {
		FiddlerObject.ReloadScript();
    }
    public static ContextAction("问卷submitdata")
    function submitdata(oSessions: Session[]) {
		m_submitdata = FiddlerObject.prompt("输入问卷数据");
        //UI.actUpdateInspector(true,true);
    }
   public static ContextAction("问卷IP")
    function My_Ip(oSessions: Session[]) {
		m_IP = FiddlerObject.prompt("输入ip地址");
        //UI.actUpdateInspector(true,true);
    }
	public static ContextAction("拦截请求")
    function stop(oSessions: Session[]) {
		if(oSessions.length>0){
			for (var x:int = 0; x < oSessions.Length; x++){
				var url = oSessions[x].fullUrl.ToString();
				sCookie = FiddlerObject.prompt("输入拦截网址",url);
			}	
		}else{
			sCookie = FiddlerObject.prompt("输入拦截网址");
		}
        //UI.actUpdateInspector(true,true);
    }
    public static ContextAction("保存Cookie")
    function saveCookie(oSessions: Session[]) {
        for (var x:int = 0; x < oSessions.Length; x++){
            oSessions[x].utilDecodeRequest();
            var location = "C:/Users/Administrator/Desktop/ocean.txt";
            var cookie = oSessions[x].oRequest.headers.AllValues("Cookie");
            writeFileOveride(location,cookie);
            FiddlerObject.playSound("C:\\windows\\media\\Fiddler.wav");
			
        }
        
    }
    public static ContextAction("R")
    function R() {
		//System.Diagnostics.Process.Start("D:\\R\\run.bat");
		var   wsh   = new ActiveXObject("WScript.Shell");
		wsh.Run("D:\\R\\run.bat");
    }    
	public static ContextAction("保存到test")
    function save(oSessions: Session[]) {
		for (var x:int = 0; x < oSessions.Length; x++){
            oSessions[x].utilDecodeRequest();
			var location = "C:/Users/Administrator/Desktop/test.txt";
            oSessions[x].SaveRequest(location,false,true);
            FiddlerObject.playSound("C:\\windows\\media\\Fiddler.wav");
			
        }
        
    }	
		
	
	
    public static RulesOption("拦截问卷提交")
    var m_question: boolean = false; 
      
    public static RulesOption("替换返回数据")
    var m_showReplaceString: boolean = false; 
    
   // public static RulesOption("替换请求数据")
   // var m_reqData: boolean = false; 
    
    RulesString("保存题目",true)
    RulesStringValue(0,"保存题目", "%CUSTOM%")
    public static var m_title:String = null;    
    RulesString("替换题目",true)
    RulesStringValue(0,"替换题目", "%CUSTOM%")
    public static var m_replace:String = null;    
            
    //RulesString("cookie和body",true)
    //RulesStringValue(0,"保存Cookie", "%CUSTOM%") 
    //RulesStringValue(1,"替换请求body","%CUSTOM%")
    //RulesStringValue(2,"拦截请求","%CUSTOM%")  
    public static var sCookie:String = null;        
    //zz
    RulesString("问卷提交",true)
    RulesStringValue(0,"&自定义数据", "%CUSTOM%")
    RulesStringValue(2,"垃圾分类", "submitdata=5%242%7D13%244%7D18%243%7D20%243%7D28%242")
    RulesStringValue(3,"廊坊市职业调查要拼接", "9%242%7D12%241%7D14%241%7D16%242%7D17%241%7D23%242")
    RulesStringValue(4,"江苏寄生虫防治", "submitdata=12%244%7D13%243%7D17%244%7D23%242%7D24%244")
    RulesStringValue(5,"德州", "submitdata=18%241%7D19%241%7D20%241%7D31%241%7D35%241%7D39%241%7D47%242%7D62%241%7D74%243%7D82%241")
    RulesStringValue(5,"北京", "submitdata=49%241%7D56%241%7D57%242%7D72%243%7D73%242")
    public static var m_submitdata: String = null;
        
    RulesString("问卷IP",true) 
    RulesStringValue(0,"随机尾数IP","%CUSTOM%")    
    RulesStringValue(1,"&自定义固定IP", "%CUSTOM%") 
    RulesStringValue(2,"青海","125.72.251.")       
    RulesStringValue(3,"北京","123.125.78.")
    RulesStringValue(4,"大连","175.162.121.")    
    RulesStringValue(5,"沧州","120.11.170.")
    RulesStringValue(6,"苏州","121.238.190.")
    RulesStringValue(7,"北京","220.181.130.")
    RulesStringValue(8,"深圳","219.134.100.") 
    RulesStringValue(9,"宝山","116.234.22.") 
    RulesStringValue(10,"清远","113.74.132.")
    RulesStringValue(11,"南京","121.225.150.")
    RulesStringValue(12,"重庆","218.70.37.")
    RulesStringValue(13,"扬州","222.189.134.")
    RulesStringValue(14,"廊坊","117.78.13.")
    RulesStringValue(15,"盐城","222.188.85.")
    RulesStringValue(16,"阜阳","218.22.113.")
    RulesStringValue(17,"银川","124.224.71.")
    RulesStringValue(18,"金华","218.75.96.")
    RulesStringValue(19,"成都","222.209.19.") 
    RulesStringValue(20,"厦门","27.159.12.")
    public static var m_IP: String = null;
    static function GetTimeStamp(){ 
        var ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0); 
        return Convert.ToInt64(ts.TotalSeconds); 
    } 
  /*   public static function GetHexFromChs(){
        

       var chs = System.Text.Encoding.GetEncoding("gb2312");
        
        var  bytes = chs.GetBytes("H");

        var str = "";
        
        for (var i = 0; i < bytes.Length; i++) {
            str += String.Format("{0:X000}", bytes[i]);
            }

        return str;
        
            }      */
   
    public static var filename: String = null;
    public static var context:String = null;
    static function writeFileAdd(filename,context)
    {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var f = fso.OpenTextFile(filename,8 );
        //var sUA: String = fso.ReadAll();
        f.writeLine(context);
        f.Close();
         
    }
         
    static function writeFileOveride(filename,context)
    {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var f = fso.OpenTextFile(filename,2,true );
        //var sUA: String = fso.ReadAll();
        f.writeLine(context);
        f.Close();
         
    }
    static function findLineInfile(filename,context){
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var f=fso.OpenTextFile(filename,1); 
        var arr=f.ReadAll().split("\r\n"); 
        for(var i= 0;i<arr.length;i++)
        {
            if (arr[i].indexOf(context) != -1)
            {
                f.close();
                return(arr[i]);
            }            
        } 
        return("");
         
    }
  
    static function readFile(filename)
    {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var f=fso.OpenTextFile(filename,1); 
        var str = "";
        while (!f.AtEndOfStream)
            str += f.ReadLine()+"\n";
        f.close();
        return(str)       
         
    }
             
    static function searchInFile(filename,context)
    {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var f=fso.OpenTextFile(filename,8);
        var strmarch= false;
     
        if (f.indexOf(context) != -1)
        {
            strmarch = true;
        }
        f.close();
        return(strmarch)
    }
   
    static function OnBeforeRequest(oSession: Session) {
        //*************以下是自定义内容*******************************************************************
        /*
        if(oSession.fullUrl.Contains("http://wx.gx.189.cn/fun/jf/wx/jf/wxJfSetup/getMemberDay")){
            oSession["ui-color"] = "red";
            var location = "C:/Users/Administrator/Desktop/test.txt";
            //oSession.SaveRequest(location,false);
            FiddlerObject.playSound("C:\\windows\\media\\Fiddler.wav");
            FiddlerObject.log("语音打开");
            
        }
       
        
        
         
        if(oSession.HTTPMethodIs("connect")){
            oSession.bypassGateway = true;
            oSession["ui-color"]="red";
            }  
        */
        
        if(sCookie != null && oSession.fullUrl.Contains(sCookie)&& sCookie !=""){          //拦截请求
			//FiddlerObject.log(sCookie);
            oSession["x-breakrequest"]="uri";
            
        }
		if(oSession.fullUrl.Contains("server/c/code/achieve")){				//佳得乐拦截推包
			 oSession["x-breakrequest"]="uri";
		}
		if(oSession.fullUrl.Contains("server/extra/c/weixin/signJsTicket")){ //佳得乐隐藏更新cookie
			  oSession["ui-hide"] = "true";
		}
		
        /*
        if(m_reqData && oSession.fullUrl.Contains("http://huodongjia.cdzghome.com/question/index") ){ //替换指定字符串
            //替换前字符串
            var oldStr = new Array( "result = data.code");
            //替换后字符串（一一对应）
            var oNewStings = new  Array("result = 0");
        
            var iEach=0;
        
            for (iEach; iEach<oldStr.length; iEach++){
               
                if (oSession.utilReplaceInRequest(oldStr[iEach], oNewStings[iEach])){         
                    //标记颜色
                    oSession["ui-color"]="red";
                }
            }
        }
        */
        var myurl ="joinnew/processjq.ashx";                       //操作问卷提交数据
        if( oSession.fullUrl.Contains(myurl)){
            if( oSession.GetRequestBodyAsString().Contains("submitdata")){      //检查body有没有submitdata
                oSession["ui-color"] = "red";
                
                
                if(null != m_submitdata &&! m_submitdata.StartsWith("submitdata") //自定义数据不是以submitdata开头
                ){  //截取前面的
                    var body = oSession.GetRequestBodyAsString().Replace("\n","").Replace("\t","").Replace("\r","");                                    
                    var index = body.IndexOf("%7D");            //  1$李凯}2$13555665544}3$4}   %7D---}
                    body=body.Substring(0,index+18);            // 3+1+3+11=18  %7D 2 %24 +11   ,数据要有%7D
                    // body=body.Substring(0,index);
                    // FiddlerObject.log(substring);
                    oSession.utilSetRequestBody(body + m_submitdata);  
                    FiddlerObject.log("ok");
                }
                    
                else if(null != m_submitdata ){                  //以submitdata开头的不修改
                    oSession.utilSetRequestBody(m_submitdata);  
                }
                /*
                //是以submitdata开头,并且截取后面的
                else if(null != m_submitdata){   //     27$1}31$1|2|3}50$1|2|4}51$吴晓}52$13555363613
                var body = oSession.GetRequestBodyAsString().Replace("\n","").Replace("\t","").Replace("\r","");  
                var index = body.LastIndexOf("%7D");        //%24---$  
               // var end = body.Length-1;
                body=m_submitdata+body.Remove(0,index-14);                  //没去掉$,要去掉则加3
               // FiddlerObject.log("body: \t"+body);
                    oSession.utilSetRequestBody(body);
                }
                */
                   
            }
         
                    // null != m_submitdata &&
                    //if(! m_submitdata.Contains("submitdata")){          //拼接sumitdata后面的数据
                    //    var body = oSession.GetRequestBodyAsString().Replace("\n","").Replace("\t","").Replace("\r","");    
                    //    var substring=body.Substring(0,index+11);   //确定截取位置下标
                    //    FiddlerObject.log(substring);
                    //    body = substring + m_submitdata;
                    //FiddlerObject.log("body--"+body);
                    //var index = body.LastIndexOf("%24")+3;
                    //body = body.Substring(0,index)+m_submitdata;
               
                    // }else 
                    // oSession.utilSetRequestBody(m_submitdata);  
                    if(m_question){                                     //拦截问卷提交
                        oSession["x-breakrequest"]="uri";
                
                    }
            }
        
      /*if (oSession.fullUrl.Contains(myurl)){     //替换cookie
                 oSession.oRequest["Cookie"] = "";
            }     */
       
        /*
        if(null != sCookie ){       //自动保存cookie***************
            
            if(oSession.fullUrl.Contains(sCookie) && oSession.oRequest.headers.AllValues("Cookie")!=""){
                
                //oSession["x-breakrequest"]="uri";
                var fso;
                var file;
                fso = new ActiveXObject("Scripting.FileSystemObject");
                file = fso.OpenTextFile("C:/Users/Administrator/Desktop/ocean.txt",2 ,true, true);    //2覆盖,8追加           
                file.writeLine(oSession.oRequest.headers.AllValues("Cookie"));           
                                  
                file.close();
            }
            
            if(oSession.fullUrl.Contains(sCookie)&&oSession.GetRequestBodyAsString() != null){      //替换body
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var file = fso.OpenTextFile("C:/Users/Administrator/Desktop/body.txt",1,true);
                var body ="";
                while(!file.AtEndOfStream){
                    body = body+ file.Readline(); 
                }
                file.close();
                oSession.utilSetRequestBody(body);
            }
            
        }
        */
        if(null != m_IP// && oSession.oRequest.host.Contains("wjx")
        ){
            //添加伪装IP        
            if(num == 10){
                var random = new Random(System.DateTime.Now.Millisecond);
                num = (int)((random.NextDouble()+0.001)*250);
            }
            if(!oSession.oRequest.headers.Exists("Cient_ip")||
            !oSession.oRequest.headers.Exists("X-forwarded-for")){
                if(m_IP.EndsWith(".")){
                    oSession.oRequest.headers.Add("Cient_ip",m_IP+num);
                    oSession.oRequest.headers.Add("X-forwarded-for",m_IP+num);
                }else{
                    oSession.oRequest.headers.Add("Cient_ip",m_IP);
                    oSession.oRequest.headers.Add("X-forwarded-for",m_IP);
                }
            }
        }  
        
        
      /*
        oSession.utilDecodeResponse();
        var oBody = System.Text.Encoding.UTF8.GetString(oSession.responseBodyBytes);
        // 使用正则进行替换
        var oRegEx=/<\/head>/ig;
        oBody = oBody.replace(oRegEx, "<script>alert(1);</script></head>");
        //设置新的响应内容
        oSession.utilSetResponseBody(oBody);
        
        if (oSession.uriContains("header.js")) {        //判断如果请求是指定的文件就用本地的一个文件来响应
        oSession["x-replywithfile"] ="E:/mod.js";
    }
        */
        /*
        if(oSession.HTTPMethodIs('CONNECT')){           
            FiddlerApplication.Log.LogString('create fake tunnel response');   
            oSession['x-replywithtunnel'] = 'FakeTunnel';           
        }
          */
           
        
            //---------------自定义内容结束-------------------------------------------------------------------------------------------

        if ((null != gs_ReplaceToken) && (oSession.url.indexOf(gs_ReplaceToken)>-1)) {   // Case sensitive
            oSession.url = oSession.url.Replace(gs_ReplaceToken, gs_ReplaceTokenWith); 
        }
        if ((null != gs_OverridenHost) && (oSession.host.toLowerCase() == gs_OverridenHost)) {
            oSession["x-overridehost"] = gs_OverrideHostWith;               //替换host,不是请求链接
        }

        if ((null!=bpRequestURI) && oSession.uriContains(bpRequestURI)) {   //拦截当前链接
            oSession["x-breakrequest"]="uri";
        }

        if ((null!=bpMethod) && (oSession.HTTPMethodIs(bpMethod))) {  //拦截方法
            oSession["x-breakrequest"]="method";
        }

        if ((null!=uiBoldURI) && oSession.uriContains(uiBoldURI)) {
            oSession["ui-bold"]="QuickExec";
        }

        if (m_SimulateModem) {
            // Delay sends by 300ms per KB uploaded.
            oSession["request-trickle-delay"] = "300"; 
            // Delay receives by 150ms per KB downloaded.
            oSession["response-trickle-delay"] = "150"; 
        }

        if (m_DisableCaching) {
            
            oSession.oRequest.headers.Remove("If-None-Match");
            oSession.oRequest.headers.Remove("If-Modified-Since");
            oSession.oRequest["Pragma"] = "no-cache";
        }

        // User-Agent Overrides
        if (null != sUA) {
            oSession.oRequest["User-Agent"] = sUA;              //自定义User-Agent
        }

        //  if (m_Japanese) {
        //     oSession.oRequest["Accept-Language"] = "ja";
        // }

        if (m_AutoAuth) {
            // Automatically respond to any authentication challenges using the 
            // current Fiddler user's credentials. You can change (default)
            // to a domain\\username:password string if preferred.
            //
            // WARNING: This setting poses a security risk if remote 
            // connections are permitted!
            oSession["X-AutoAuth"] = "(default)";
        }

        if (m_AlwaysFresh && (oSession.oRequest.headers.Exists("If-Modified-Since") || oSession.oRequest.headers.Exists("If-None-Match")))
        {
            oSession.utilCreateResponseAndBypassServer();
            oSession.responseCode = 304;
            oSession["ui-backcolor"] = "Lavender";
        }
    }

        // This function is called immediately after a set of request headers has
        // been read from the client. This is typically too early to do much useful
        // work, since the body hasn't yet been read, but sometimes it may be useful.
        //
        // For instance, see 
        // http://blogs.msdn.com/b/fiddler/archive/2011/11/05/http-expect-continue-delays-transmitting-post-bodies-by-up-to-350-milliseconds.aspx
        // for one useful thing you can do with this handler.
        //
        // Note: oSession.requestBodyBytes is not available within this function!
        /*
        static function OnPeekAtRequestHeaders(oSession: Session) {
        var sProc = ("" + oSession["x-ProcessInfo"]).ToLower();
        if (!sProc.StartsWith("mylowercaseappname")) oSession["ui-hide"] = "NotMyApp";
        }
        */

        //
        // If a given session has response streaming enabled, then the OnBeforeResponse function 
        // is actually called AFTER the response was returned to the client.
        //
        // In contrast, this OnPeekAtResponseHeaders function is called before the response headers are 
        // sent to the client (and before the body is read from the server).  Hence this is an opportune time 
        // to disable streaming (oSession.bBufferResponse = true) if there is something in the response headers 
        // which suggests that tampering with the response body is necessary.
        // 
        // Note: oSession.responseBodyBytes is not available within this function!
        //
        static function OnPeekAtResponseHeaders(oSession: Session) {
            //FiddlerApplication.Log.LogFormat("Session {0}: Response header peek shows status is {1}", oSession.id, oSession.responseCode);
            if (m_DisableCaching) {
                oSession.oResponse.headers.Remove("Expires");
                oSession.oResponse["Cache-Control"] = "no-cache";
            }

            if ((bpStatus>0) && (oSession.responseCode == bpStatus)) {
                oSession["x-breakresponse"]="status";
                oSession.bBufferResponse = true;
            }
        
            if ((null!=bpResponseURI) && oSession.uriContains(bpResponseURI)) {
                oSession["x-breakresponse"]="uri";
                oSession.bBufferResponse = true;
            }

        }
  
                
    static function OnBeforeResponse(oSession: Session) {
        if (m_Hide304s && oSession.responseCode == 304) {
            oSession["ui-hide"] = "true";
        }
       	
        
        
            if(m_title != null && oSession.fullUrl.Contains(m_title)){
                oSession["ui-color"] = "red";
                m_replace = null;
                oSession.utilDecodeResponse();
                var response = oSession.GetResponseBodyAsString();
                var save = "C:/Users/Administrator/Desktop/body.txt";
                var responsebody = response;
				//response.replace(/[\r\n]/g, "!");
                var title = "";
                title =responsebody.match(/(<fieldset(.*)fieldset>)/)[1];
                //title = title.replace(/[\!]/g, " ");
                if(title !=""){
                     writeFileOveride(save,title);
                   //  FiddlerObject.log("\n"+title);
                }
            
			if(m_replace != null &&oSession.fullUrl.Contains(m_replace)){
                oSession["ui-color"] = "red";
                m_title = null;
                var response = oSession.GetResponseBodyAsString();
                var save = "C:/Users/Administrator/Desktop/body.txt";
                var title = readFile(save);
                var temp = "111";
                var rawTitle =response.match(/(<fieldset(.*)fieldset>)/)[1];
                temp = response.Replace(rawTitle,title);
                oSession["ui-color"] = "red";
                //FiddlerObject.log("\n"+temp);
                oSession.utilSetResponseBody(temp);
            }    
			
         }
        
        
        
                // if(oSession.fullUrl.Contains("do=answer&m=jk_answer")){
        if(oSession.fullUrl.Contains("&do=question")||oSession.fullUrl.Contains("/qd_1/f/dati/toDati?recordId=")){
            //if(oSession.fullUrl.Contains("i=12&c=entry&model=questionaire&do=GetQ&m")){
            oSession.utilDecodeResponse();
            //var yes = "var yes = ";
            var yes = "var yes =";
            var yeah = "yes\":\"";
            //var te = "本题答案";   
            var result = oSession.GetResponseBodyAsString();
            oSession["ui-color"] = "red";
            FiddlerObject.log("-------------------------------------");
            var index = -1;
            index = result.IndexOf(yes);
            if(index != -1 ){
                FiddlerObject.log("\t\t"+result.Substring(index,25)+"\n");
            }else {
                index = result.IndexOf(yeah);
                if(index != -1){
                    FiddlerObject.log("\t\t"+result.Substring(index,15));
                }
                
            }
		
        }
        
            if(oSession.fullUrl.Contains("Question.do")){    //科普
                oSession.utilDecodeResponse();
                //var reg = "answer\":";
                var reg = "data-ans";
                var i = 0;
                var result = oSession.GetResponseBodyAsString();
                oSession["ui-color"] = "red";
                FiddlerObject.log("-------------------------------------");
                for(i;i<18;i++){
                    var index =-1;
                    index = result.IndexOf(reg);
                    if(index != -1 ){
                        FiddlerObject.log("\t\t"+result.Substring(index,20));
                        result = result.Remove(0,index+20);
                    }                     
                }           
                FiddlerObject.log("-------------------------------------");
            }
       
         /*
        if(oSession.fullUrl.Contains("XfaqQuestion")){    //中山发布
            oSession.utilDecodeResponse();
            var reg = "true_answer";
            var i = 0;
            var result = oSession.GetResponseBodyAsString();
            oSession["ui-color"] = "red";
            FiddlerObject.log("-------------------------------------");
            for(i;i<6;i++){
                var index =-1;
                index = result.IndexOf(reg);
                if(index != -1 ){
                    FiddlerObject.log("\t\t"+result.Substring(index,20));
                    result = result.Remove(0,index+20);
                }                     
            }           
            FiddlerObject.log("-------------------------------------");
        }
	*/
        
        //替换response中指定string,引号需转义
        //oSession.HostnameIs("www.baidu.com")中，www.baidu.com替换为指定域名
        //ExistsAndContains("Content-Type","application/json") 根据Response的header修改Content-Type的值
            if(m_showReplaceString && (oSession.fullUrl.Contains("joinnew/css/jqmobo.css")||oSession.fullUrl.Contains("joinnew/js/jqmobo2.js")
            
                )
            ){
                //以decode格式解码
                oSession.utilDecodeResponse();
                //替换前字符串
                //var myReg = /\,?\w\.preventDefault\(\)/;
                var oReplaceStrings = new Array( 'function(){return!1}','-webkit-user-select: none;','select:none','callout:none');
                //替换后字符串（一一对应）
                var oNewStings = new  Array('function(){return true}','','select:all','callout:all');
        
                var iEach=0;
        
                // oSession["ui-customcolumn"]=String.Empty;
        
                for (iEach; iEach<oReplaceStrings.length; iEach++){
                    // if true
                    if (oSession.utilReplaceInResponse(oReplaceStrings[iEach], oNewStings[iEach])){         //替换指定字符串
                        //标记颜色
                        oSession["ui-color"]="red";
                        //加粗
                        oSession["ui-bold"]="true";
                        //在custom标识response中被替换的字符串
                        //  oSession["ui-customcolumn"] += oReplaceStrings[iEach]+";  ";
                    }else{
                        // FiddlerObject.log("没有查找到指定字符串-----" + oReplaceStrings[iEach]);
                        oSession["ui-color"]="orange";
                    }
            
                }
            }
        
               /*
        if ( m_showMarkString && oSession.HostnameIs("dgdc.123jkb.cn")){
            //以decode格式解码
            oSession.utilDecodeResponse();
            //需要标记的字符串
            var oFindStrings = new Array( "res > 0");
 
            // For each target string, check the response to see if it's present.
            var iEach=0;
         
            oSession["ui-customcolumn"]=String.Empty;
 
            for (iEach; iEach<oFindStrings.length; iEach++){
                if (oSession.utilFindInResponse(oFindStrings[iEach], false)>0 ) {       //查找指定字符串
                    //标记颜色
                    oSession["ui-color"]="#FF00EE";
                    //加粗
                    oSession["ui-bold"]="true";
                    //在custom标识response中有的关键字
                   // oSession["ui-customcolumn"] += oFindStrings[iEach]+"; ";
                }
            }
         
        }
        */
       
        
        
        
        
        
        
        
    }

/*
    // This function executes just before Fiddler returns an error that it has 
    // itself generated (e.g. "DNS Lookup failure") to the client application.
    // These responses will not run through the OnBeforeResponse function above.
    static function OnReturningError(oSession: Session) {
    }
*/
/*
    // This function executes after Fiddler finishes processing a Session, regardless
    // of whether it succeeded or failed. Note that this typically runs AFTER the last
    // update of the Web Sessions UI listitem, so you must manually refresh the Session's
    // UI if you intend to change it.
    static function OnDone(oSession: Session) {
    }
*/

    /*
    static function OnBoot() {
        MessageBox.Show("Fiddler has finished booting");
        System.Diagnostics.Process.Start("iexplore.exe");

        UI.ActivateRequestInspector("HEADERS");
        UI.ActivateResponseInspector("HEADERS");
    }
    */

    /*
    static function OnBeforeShutdown(): Boolean {
        // Return false to cancel shutdown.
        return ((0 == FiddlerApplication.UI.lvSessions.TotalItemCount()) ||
                (DialogResult.Yes == MessageBox.Show("Allow Fiddler to exit?", "Go Bye-bye?",
                 MessageBoxButtons.YesNo, MessageBoxIcon.Question, MessageBoxDefaultButton.Button2)));
    }
    */

    /*
    static function OnShutdown() {
            MessageBox.Show("Fiddler has shutdown");
    }
    */

    /*
    static function OnAttach() {
        MessageBox.Show("Fiddler is now the system proxy");
    }
    */

    /*
    static function OnDetach() {
        MessageBox.Show("Fiddler is no longer the system proxy");
    }
    */

    // The Main() function runs everytime your FiddlerScript compiles
            static function Main() {
                // var today: Date = new Date();
                FiddlerObject.StatusText = " CustomRules.js was loaded at: ";// + today;

                // Uncomment to add a "Server" column containing the response "Server" header, if present
                // UI.lvSessions.AddBoundColumn("Server", 50, "@response.server");

                // Uncomment to add a global hotkey (Win+G) that invokes the ExecAction method below...
                UI.RegisterCustomHotkey(HotkeyModifiers.Shift, Keys.Z, "go"); 
				
            }

            // These static variables are used for simple breakpointing & other QuickExec rules 
            BindPref("fiddlerscript.ephemeral.bpRequestURI")
            public static var bpRequestURI:String = null;

            BindPref("fiddlerscript.ephemeral.bpResponseURI")
            public static var bpResponseURI:String = null;

            BindPref("fiddlerscript.ephemeral.bpMethod")
            public static var bpMethod: String = null;

            static var bpStatus:int = -1;
            static var uiBoldURI: String = null;
            static var gs_ReplaceToken: String = null;
            static var gs_ReplaceTokenWith: String = null;
            static var gs_OverridenHost: String = null;
            static var gs_OverrideHostWith: String = null;

            // The OnExecAction function is called by either the QuickExec box in the Fiddler window,
            // or by the ExecAction.exe command line utility.
            static function OnExecAction(sParams: String[]): Boolean {

                FiddlerObject.StatusText = "ExecAction: " + sParams[0];
				
                var sAction = sParams[0].toLowerCase();
                switch (sAction) {
                    case "bold":
                        if (sParams.Length<2) {uiBoldURI=null; FiddlerObject.StatusText="Bolding cleared"; return false;}
                        uiBoldURI = sParams[1]; FiddlerObject.StatusText="Bolding requests for " + uiBoldURI;
                        return true;
                    case "bp":
                        FiddlerObject.alert("bpu = breakpoint request for uri\nbpm = breakpoint request method\nbps=breakpoint response status\nbpafter = breakpoint response for URI");
                        return true;
                    case "bps":
                        if (sParams.Length<2) {bpStatus=-1; FiddlerObject.StatusText="Response Status breakpoint cleared"; return false;}
                        bpStatus = parseInt(sParams[1]); FiddlerObject.StatusText="Response status breakpoint for " + sParams[1];
                        return true;
                    case "bpv":
                    case "bpm":
                        if (sParams.Length<2) {bpMethod=null; FiddlerObject.StatusText="Request Method breakpoint cleared"; return false;}
                        bpMethod = sParams[1].toUpperCase(); FiddlerObject.StatusText="Request Method breakpoint for " + bpMethod;
                        return true;
                    case "bpu":
                        if (sParams.Length<2) {bpRequestURI=null; FiddlerObject.StatusText="RequestURI breakpoint cleared"; return false;}
                        bpRequestURI = sParams[1]; 
                        FiddlerObject.StatusText="RequestURI breakpoint for "+sParams[1];
                        return true;
                    case "bpa": 
                    case "bpafter":
                        if (sParams.Length<2) {bpResponseURI=null; FiddlerObject.StatusText="ResponseURI breakpoint cleared"; return false;}
                        bpResponseURI = sParams[1]; 
                        FiddlerObject.StatusText="ResponseURI breakpoint for "+sParams[1];
                        return true;
                    case "overridehost":
                        if (sParams.Length<3) {gs_OverridenHost=null; FiddlerObject.StatusText="Host Override cleared"; return false;}
                        gs_OverridenHost = sParams[1].toLowerCase();
                        gs_OverrideHostWith = sParams[2];
                        FiddlerObject.StatusText="Connecting to [" + gs_OverrideHostWith + "] for requests to [" + gs_OverridenHost + "]";
                        return true;
                    case "urlreplace":
                        if (sParams.Length<3) {gs_ReplaceToken=null; FiddlerObject.StatusText="URL Replacement cleared"; return false;}
                        gs_ReplaceToken = sParams[1];
                        gs_ReplaceTokenWith = sParams[2].Replace(" ", "%20");  // Simple helper
                        FiddlerObject.StatusText="Replacing [" + gs_ReplaceToken + "] in URIs with [" + gs_ReplaceTokenWith + "]";
                        return true;
                    case "allbut":
                    case "keeponly":
                        if (sParams.Length<2) { FiddlerObject.StatusText="Please specify Content-Type to retain during wipe."; return false;}
                        UI.actSelectSessionsWithResponseHeaderValue("Content-Type", sParams[1]);
                        UI.actRemoveUnselectedSessions();
                        UI.lvSessions.SelectedItems.Clear();
                        FiddlerObject.StatusText="Removed all but Content-Type: " + sParams[1];
                        return true;
                    case "stop":
                        UI.actDetachProxy();
                        return true;
                    case "start":
                        UI.actAttachProxy();
                        return true;
                    case "cls":
                    case "clear":
                        UI.actRemoveAllSessions();
                        return true;
                    case "g":
                    case "go":
                        UI.actResumeAllSessions();
                        return true;
                    case "goto":
                        if (sParams.Length != 2) return false;
                        Utilities.LaunchHyperlink("http://www.google.com/search?hl=en&btnI=I%27m+Feeling+Lucky&q=" + Utilities.UrlEncode(sParams[1]));
                        return true;
                    case "help":
                        Utilities.LaunchHyperlink("http://fiddler2.com/r/?quickexec");
                        return true;
                    case "hide":
                        UI.actMinimizeToTray();
                        return true;
                    case "log":
                        FiddlerApplication.Log.LogString((sParams.Length<2) ? "User couldn't think of anything to say..." : sParams[1]);
                        return true;
                    case "nuke":
                        UI.actClearWinINETCache();
                        UI.actClearWinINETCookies(); 
                        return true;
                    case "screenshot":
                        UI.actCaptureScreenshot(false);
                        return true;
                    case "show":
                        UI.actRestoreWindow();
                        return true;
                    case "tail":
                        if (sParams.Length<2) { FiddlerObject.StatusText="Please specify # of sessions to trim the session list to."; return false;}
                        UI.TrimSessionList(int.Parse(sParams[1]));
                        return true;
                    case "quit":
                        UI.actExit();
                        return true;
                    case "dump":
                        UI.actSelectAll();
                        UI.actSaveSessionsToZip(CONFIG.GetPath("Captures") + "dump.saz");
                        UI.actRemoveAllSessions();
                        FiddlerObject.StatusText = "Dumped all sessions to " + CONFIG.GetPath("Captures") + "dump.saz";
                        return true;

                    default:
                        if (sAction.StartsWith("http") || sAction.StartsWith("www.")) {
                            System.Diagnostics.Process.Start(sParams[0]);
                            return true;
                        }
                        else
                        {
                            FiddlerObject.StatusText = "Requested ExecAction: '" + sAction + "' not found. Type HELP to learn more.";
                            return false;
                        }
                }
            }
        }