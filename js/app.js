/* SantaModel assists santa's helpers in packing children's requests.
 * It provides quality control by checking if the requests are being
 * fulfilled
 */

var SantaModel = {
  
  /* Initializes the model with a list of requests, 
   * and sets the first one as the current one 
   */
   init : function(list){
       console.log(this.requests);
       
        var indice = 0;
        var currentRequest = this.getCurrentRequest(indice);
        list.push(currentRequest);
      
   },
  
   /* It moves "current" to the next request */
   next : function (){
       
       this.indice++;
       
       return this.indice;
       
   },
  
   /* Returns the current request. 
    * If all requests have been processed (there is no current one), it returns null 
    */
   getCurrentRequest : function (index) {
       console.log(index);
       
       var currentRequest = this.requests[index];
       
       
   },  
    
   /* Packs the given item if it fulfills the current request.       
    * returns 1 if the given item fulfills the request (= answer)
    * returns 0 if the given item does not fulfill the request
    */
   pack : function(item) {
       
       var correct = false;
       var currentAnswer = item;
       if (currentAnswer == this.getCurrentRequest(this.indice).answer){
           correct = true;
       }
           
       
       
       return correct;
   }      
  
};


var SantaControl = {
    init : function(){
        var list = [];
         var risposteCorrette = 0;
        SantaModel.init(list);
        SantaView.init();
       
    },
    
    pack : function(item){
        if( SantaModel.pack(item)){
            this.risposteCorrette++;
        };
        
    },
    
    next : function (){
        SantaModel.next();
        SantaView.init();
    }
    
    
};


var SantaView = {
    init : function(){
        var self = this;
        var currentQuestion = SantaModel.getCurrentRequest.question;
        console.log(currentQuestion);
        this.render(currentQuestion);
        
        $("#yes-button").on("click", function(){
            
            SantaControl.pack("yes");
            SantaControl.next();
            
            
            
        })
        
        $("#no-button").on("click", function(){
               
            SantaControl.pack("no");
            SantaControl.next();
            
            
        })
        
        
        self.render();
    },
    
    render : function(question){
        
        console.log("render");
                 $(".card").empty();
                 $(".card").append("<h2 class='question'>" + question + "</h1>" +
             "<ul> class='question-items'>" +
            "<li>" +
              "<button id='yes-button' type='button'>Yes</button>" +
              "<button id='no-button' type='button'>No</button>" +
            "</li>" +
            "</ul>");
                 
       
        
            
    }
    
};


$(document).ready(function(){
    SantaControl.init();
});