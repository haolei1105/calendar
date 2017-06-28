////////////////////////////////
// Author: Bora DAN — http://codecanyon.net/user/bqra
// 18 August 2013
// E-mail: bora_dan@hotmail.com
////////////////////////////////

$(function () {    
    (function ($) {
        $.fn.jalendar = function (options) {
            
            var settings = $.extend({
                customDay: new Date(),
                color: 'blue',
                lang: 'EN'
            }, options);
            
            // Languages            
            var dayNames = {};
            var monthNames = {};
            var lAddEvent = {};
            var lAllDay = {};
            var lTotalEvents = {};
            var lEvent = {};
            dayNames['EN'] = new Array('一', '二', '三', '四', '五', '六', '日');
            monthNames['EN'] = new Array('一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月');
            lAddEvent['EN'] = '添加日程';
            lAllDay['EN'] = '整天';
            lTotalEvents['EN'] = '本月总事件: ';
            lEvent['EN'] = '日程';
            
            
            var $this = $(this);
            var div = function (e, classN) {
                return $(document.createElement(e)).addClass(classN);
            };
            
            var clockHour = [];
            var clockMin = [];
            for (var i=0;i<24;i++ ){
                clockHour.push(div('div', 'option').text(i))
            }
            for (var i=0;i<59;i+=5 ){
                clockMin.push(div('div', 'option').text(i))
            }
            
            // HTML Tree
            $this.append(
                div('div', 'wood-bottom'), 
                div('div', 'jalendar-wood').append(
                    div('div', 'close-button'),
                    div('div', 'jalendar-pages').append(
                        div('div', 'pages-bottom'),
                        div('div', 'header').css('background-color', settings.color).append(
                            div('a', 'prv-m'),
                            div('h1'),
                            div('a', 'nxt-m'),
                            div('div', 'day-names')
                        ),
                        div('div', 'total-bar').html( lTotalEvents[settings.lang] + '<b style="color: '+settings.color+'"></b>'),
                        div('div', 'days clearfix')
                    ),
                    div('div','add-nr'),
                    div('div', 'add-event').append(
                        div('div', 'add-new').append(
                        	'<p class="bt">标题：<input class="even" type="text"value="请输入标题"/></p>',
                            '<p class="dj">等级：<input class="major" type="radio" name="major" value="1"><span class="aa">重要</span><input class="major" type="radio" name="major" value="2"  checked="checked" ><span class="aa">一般</span></p>',
                            '<div><p class="nr">内容：</p><form class="wb"><textarea name="s1" id="texts" rows="3"></textarea></form></div>',
                            div('div', 'submit'),
                            div('div', 'clear'),
                            div('div', 'add-time').append(
                                div('div', 'disabled'),
                                div('div', 'select').addClass('hour').css('background-color', settings.color).append(
                                    div('span').text('00'),
                                    div('div', 'dropdown').append(clockHour)
                                ),
                                div('div', 'left').append(':'),
                                div('div', 'select').addClass('min').css('background-color', settings.color).append(
                                    div('span').text('00'),
                                    div('div', 'dropdown').append(clockMin)
                                )
                            ),
                            div('div', 'all-day').append(
                                div('fieldset').attr('data-type','disabled').append(
                                    div('div', 'check').append(
                                        div('span', '')
                                    ),
                                    div('label').text(lAllDay[settings.lang])
                                )
                            ),
                            div('div', 'clear')
                        ),
                        div('div', 'events').append(
                            div('h3','').append(
                                div('span', '').html(lEvent[settings.lang])
                            ),
                            div('div', 'gradient-wood'),
                            div('div', 'events-list')
                        )
                    )
                )
            );
            /*标题*/
            var bt=$(".bt");
            bt.css({
            	"color":"#454545",
                "height":"30px",
            	"line-height": "30px"
            });
            bt.children('input').css({
            	"background":"#FAFAFA",
            	"color":"#999999",
            	"width":"220px",
            	"font-size": "14px",
                "position":"relative",
                "top": "6px",
                "left":"12px"
            })
            /*事件等级*/
            
            $(".dj").css({
            	"color":"#454545",
            	"margin-top":"10px",
            });
            
            $(".major").css({
            	 "color":"black",
            	 "font-weight":"100",
            	 "margin-left":"15px"
             })
             
            $(".aa").css({
            	"color":"#2683E2"
            })
            /* 内容*/
            $(".nr").css({
            	"color":"#454545",
            	"float":"left"
            })
            $(".wb").css({
            	"float":"left",
            	"margin-left":"12px"
            })           
            $("#texts").css({
            	"background":"#FAFAFA",
            	"border":"1px solid #CDCDCD"
            })
            
            $(".add-nr").css({
            	"display":"none",
            	"width":"305px",
            	"height":"115px",
            	"padding":"10px",
            	"background":"#cdecf9",
            	"z-index":"5000",
            	"position":"absolute",
            	"top":"-140px",
            	"left":"-44px",
            	"border-radius":"5px",
            	"border": "1px solid #FBC700",
            	"box-shadow": "0 9px 10px rgba(0,0,0,0.5)"
            })
            // Adding day boxes
            for (var i = 0; i < 42; i++) {
                $this.find('.days').append(div('div', 'day'));
            }
            
            // Adding day names fields
            for (var i = 0; i < 7; i++) {
                $this.find('.day-names').append(div('h2').text(dayNames[settings.lang][i]));
            }

            var d = new Date(settings.customDay);
            var year = d.getFullYear();
            var date = d.getDate();
            var month = d.getMonth();
            
            var isLeapYear = function(year1) {
                var f = new Date();
                f.setYear(year1);
                f.setMonth(1);
                f.setDate(29);
                return f.getDate() == 29;
            };
        
            var feb;
            var febCalc = function(feb) { 
                if (isLeapYear(year) === true) { feb = 29; } else { feb = 28; } 
                return feb;
            };
            var monthDays = new Array(31, febCalc(feb), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

            function calcMonth() {

                monthDays[1] = febCalc(feb);
                
                var weekStart = new Date();
                weekStart.setFullYear(year, month, 0);
                var startDay = weekStart.getDay();  
                
                $this.find('.header h1').html(monthNames[settings.lang][month] + ' ' + year);
                
                
         
                
                
                
                $this.find('.day').html('&nbsp;');
                $this.find('.day').removeClass('this-month');
                for (var i = 1; i <= monthDays[month]; i++) {
                    startDay++;
                    $this.find('.day').eq(startDay-1).addClass('this-month').attr('data-date', i+'/'+(month+1)+'/'+year).html(i);
                }
                if ( month == d.getMonth() ) {
                   $this.find('.day.this-month').removeClass('today').eq(date-1).addClass('today').css('color', settings.color);
                } else {
                    $this.find('.day.this-month').removeClass('today').attr('style', '');
                }
                
                // added event
                $this.find('.added-event').each(function(i){
    			    
                    $(this).attr('data-id', i);

                    $this.find('.this-month[data-date="' + $(this).attr('data-date') + '"]').append(
                        div('div','event-single').attr('data-id', i).append(
                            div('p','').text($(this).attr('data-title')),
                            div('div','details').append(
                                div('div', 'clock').text($(this).attr('data-time')),
                                div('div', 'erase')
                            )
                        )
                    );
                    
			   
			  
                    
                    
                    
                    
                    if ($(this).attr('data-major') == "1"){
                        $this.find('.day').has('.event-single').addClass('have-event').prepend(div('i','in'));
                    }
                    else{
                        $this.find('.day').has('.event-single').addClass('have-event').prepend(div('i',''));
                    }
                });
 			   
                
                
                
                $.ajax({
	                url:'/jrjw/a/sys/index/grrc',
	                data:{
	                	qDate:month
	                },
	               success: function (grrcList) {

	            	   if (grrcList && grrcList.length>0) {
	            		   
	            		   for (var i = 0; i < grrcList.length; i++) {
	            			  
	            			    
	            			 
	            			   
	            			   
	            			   var id= grrcList[i].id;
	            			   var type= grrcList[i].type;
	            			   var content= grrcList[i].content;
	            			   var title=grrcList[i].title;
	            			   var sydate=grrcList[i].syDate;
	            			    $this.find('.this-month').each(function(){
	            			    	
	            	            	if($(this).attr('data-date')==sydate){
	            	            		
	            	            		if(type=="重要"){
	            	            			var oi = document.createElement("i");
	            	            			$(oi).attr({
	                	            			"class":"in"
	                	            		})
	            	            		}else{
	            	            			var oi = document.createElement("i");
	            	            		}
	            	            		
	            	 
	            	            		var oDiv=document.createElement("div");
	            	            		$(oDiv).attr({
	            	            			"class":"event-single",
	            	            			"data-id":id
	            	            		})
	            	            		var oP=document.createElement("p");
	            	            		$(oP).text(title);
	            	            		var inputs=document.createElement("input");
	            	            		$(inputs).hide();
	            	            		$(inputs).val(content);
	            	            		var oDetails =document.createElement("div");
	            	            		$(oDetails).attr({
	            	            			"class":"details",
	            	            		})
	            	            		var oClock=document.createElement("div");
	            	            		$(oClock).attr({
	            	            			"class":"clock",
	            	            		})
	            	            		$(oClock).text("00:00")
	            	            		var oErase=document.createElement("div");
	            	            		$(oErase).attr({
	            	            			"class":"erase",
	            	            		})
	            	            		$(oDetails).append(oClock)
	            	            		$(oDetails).append(oErase)
	            	            		$(oDiv).append(oP);
	            	            		$(oDiv).append(inputs);
	            	            		$(oDiv).append(oDetails);
	            	            		$(this).append(oi);//判断如果是重要给i添加一个“in”类名；
	            	            		$(this).append(oDiv);
	            	            		
	            	                	$this.on('click','.event-single',function(){
	            	                		$this.find('.add-nr').show();
	            	                		var nr= $(this).children('input').val();
	            	                		$this.find('.add-nr').text(nr);
	            	                		
	            	                	});
	            	            	}
	            	           
	            			    
	            			    
	            			    })
	            
	            		   }
	            		   }
	            	
               }
			 });
                
                
                
                
         
                
                calcTotalDayAgain();  
                
            }
            
            calcMonth();
            
            var arrows = new Array ($this.find('.prv-m'), $this.find('.nxt-m'));
           
            var dropdown = new Array (
            		$this.find('.add-time .select span'), $this.find('.add-time .select .dropdown .option'), $this.find('.add-time .select'));
            var allDay = new Array ('.all-day fieldset[data-type="disabled"]', '.all-day fieldset[data-type="enabled"]');
            var $close = $this.find('.jalendar-wood > .close-button');
            var $erase = $this.find('.event-single .erase');
            $this.find('.jalendar-pages').css({'width' : $this.find('.jalendar-pages').width() });
            $this.find('.events').css('height', ($this.height()-197) );
            
            $this.find('.select .dropdown .option').hover(function() {
                $(this).css('background-color', settings.color); 
            }, function(){
                $(this).css('background-color', 'inherit'); 
            });
            var jalendarWoodW = $this.find('.jalendar-wood').width();
            var woodBottomW = $this.find('.wood-bottom').width();
            
            //点击标题框value消失；
        	$(".even").click(function(){
        		$(this).focus();
        		$(this).val("");
        	})
        	
            // calculate for scroll
            function calcScroll() {
                if ( $this.find('.events-list').height() < $this.find('.events').height() ) { $this.find('.gradient-wood').hide(); $this.find('.events-list').css('border', 'none') } else { $this.find('.gradient-wood').show(); }
            }
            
            // Calculate total event again
            function calcTotalDayAgain() {
                var eventCount = $this.find('.this-month .event-single').length;
                $this.find('.total-bar b').text(eventCount);
                $this.find('.events h3 span b').text($this.find('.events .event-single').length)
            }
            
            function prevAddEvent() {
                $this.find('.day').removeClass('selected').removeAttr('style');
                $this.find('.today').css('color', settings.color);
                $this.find('.add-event').hide();
                $this.children('.jalendar-wood').animate({'width' : jalendarWoodW}, 200);
                $this.children('.wood-bottom').animate({'width' : woodBottomW}, 200);
                $close.hide();
            }
            
            arrows[1].on('click', function () {
            	$this.find('.add-nr').hide();
                if ( month >= 11 ) {
                    month = 0;
                    year++;
                } else {
                    month++;   
                }
                calcMonth();
                prevAddEvent();
            });
            arrows[0].on('click', function () {
            	$this.find('.add-nr').hide();
                dayClick = $this.find('.this-month');
                if ( month === 0 ) {
                    month = 11;
                    year--;
                } else {
                    month--;   
                }
                calcMonth();
                prevAddEvent();
            });
            
            $this.on('click', '.this-month', function () {
            	$this.find('.add-nr').hide();
                var eventSingle = $(this).find('.event-single');
                $this.find('.events .event-single').remove();
                prevAddEvent();
                $(this).addClass('selected').css({'background-color': settings.color});
                $this.children('.jalendar-wood, .wood-bottom').animate({width : '+=300px' }, 200, function() {
                $this.find('.add-event').show().find('.events-list').html(eventSingle.clone())
                    $this.find('.add-new input').val("请输入内容");
                	$this.find('.add-new textarea').val("");
                    $this.find('.add-new input').select();
                    calcTotalDayAgain();
                    calcScroll();
                    $close.show();
                });
            });
            
            dropdown[0].click(function(){
                dropdown[2].children('.dropdown').hide(0);
                $(this).next('.dropdown').show(0);
            });
            dropdown[1].click(function(){
                $(this).parent().parent().children('span').text($(this).text());
                dropdown[2].children('.dropdown').hide(0);
            });
            $('html').click(function(){
                dropdown[2].children('.dropdown').hide(0); 
            });
            $('.add-time .select span').click(function(event){
                event.stopPropagation(); 
            });
            
            $this.on('click', allDay[0], function(){
                $(this).removeAttr('data-type').attr('data-type', 'enabled').children('.check').children().css('background-color', settings.color);
                dropdown[2].children('.dropdown').hide(0);
                $(this).parents('.all-day').prev('.add-time').css('opacity', '0.4').children('.disabled').css('z-index', '10');
            });
            $this.on('click', allDay[1], function(){
                $(this).removeAttr('data-type').attr('data-type', 'disabled').children('.check').children().css('background-color', 'transparent');
                $(this).parents('.all-day').prev('.add-time').css('opacity', '1').children('.disabled').css('z-index', '-1');
            });
            
            
            // add new event with panel
            var dataId = parseInt($this.find('.total-bar b').text());
            $this.find('.submit').on('click', function(){
                var title = $(this).parents('.add-new').find('input.even').val();
                var dataMajor = $(this).parents('.add-new').find('input[name="major"]:checked').val();
                var hour = $(this).parents('.add-new').find('.hour > span').text();
                var min = $(this).parents('.add-new').find('.min > span').text();
                var isAllDay = $(this).parents('.add-new').find('.all-day fieldset').attr('data-type');
                var isAllDayText = $(this).parents('.add-new').find('.all-day fieldset label').text();
                var thisDay = $this.find('.day.this-month.selected').attr('data-date');
                var time;
                var text=$(this).parents('.add-new').find('#texts').val();
                
                console.log(title);
                console.log(dataMajor);
                console.log(text);
                console.log(thisDay);
                $.ajax({
                	url:"/jrjw/a/sys/index/savegrrc",
                	data:{
                		title:title,
                		type:dataMajor,
                		content:text,
                		scheduleDate:thisDay
                	},
                	success:function(){
                        if ( isAllDay == 'disabled' ) {
                            time = hour + ':' + min;
                        } else {
                            time = isAllDayText;
                        }
                        $this.prepend(div('div', 'added-event').attr({'data-date':thisDay, 'data-time': time, 'data-title': title, 'data-id': dataId ,'data-major': dataMajor}));
                        	$this.find('.day.this-month.selected').prepend(
                                    div('div','event-single').attr('data-id', dataId).append(
                                            div('p','').text(title),
                                            div('input','blo').val(text),
                                            div('div','details').append(
                                                div('div', 'clock').text(time),
                                                div('div', 'erase')
                                            )
                                        )	
                            );
                        	
                        	$('.blo').hide();
                        	var oo=$('.blo').val();
                        if (dataMajor == '1'){
                            $this.find('.day').has('.event-single').addClass('have-event').prepend(div('i','in'));
                            // $this.find('.day').has('.event-single').addClass('have-event').css('color','red')
                        }
                        else{
                            $this.find('.day').has('.event-single').addClass('have-event').prepend(div('i',''));
                        }
                        
                    	$this.on('click','.event-single',function(){
                    		$this.find('.add-nr').show();
                    		var nr= $(this).children('input').val();
                    		$this.find('.add-nr').text(nr);
                    		
                    	})
                        $this.find('.events-list').html($this.find('.day.this-month.selected .event-single').clone())
                        $this.find('.events-list .event-single').eq(0).hide().slideDown();
                        calcTotalDayAgain();
                        calcScroll();
                        // scrolltop after adding new event
                        $this.find('.events-list').scrollTop(0);
                        // form reset
                        $this.find('.add-new > input[type="text"]').val(lAddEvent[settings.lang]).select();
                        dataId++;
                	}
                })
                /*$(".even").val("请出入标题");*/

            });
            
            //交互
/*            $.ajax({
	                url:'',
	                data:{
	                	
	                },
	               success: function (aa) {
	            	
               }
			 });*/
//            $.ajax({
//              url:'/jrjw/a/sys/index/grrc',
//              data:{
//              	qDate:month
//              },
//              success: function (grrcList) {
//            	   if (grrcList && grrcList.length>0) {
//            		   for (var i = 0; i < grrcList.length; i++) {
//            			   var type= grrcList[i].type;
//            			   var content= grrcList[i].content;
//            			   var title=grrcList[i].title;
//            			   var sydate=grrcList[i].syDate;
//            			    $this.find('.this-month').each(function(){
//            	            	if($(this).attr('data-date')==sydate){
//            	            		if(type=="重要"){
//            	            			var oi = document.createElement("i");
//            	            			$(oi).attr({
//                	            			"class":"in"
//                	            		})
//            	            		}else{
//            	            			var oi = document.createElement("i");
//            	            		}
//            	            		
//            	 
//            	            		var oDiv=document.createElement("div");
//            	            		$(oDiv).attr({
//            	            			"class":"event-single",
//            	            			"data-id":"0"
//            	            		})
//            	            		var oP=document.createElement("p");
//            	            		$(oP).text(title);
//            	            		var inputs=document.createElement("input");
//            	            		$(inputs).hide();
//            	            		$(inputs).val(content);
//            	            		var oDetails =document.createElement("div");
//            	            		$(oDetails).attr({
//            	            			"class":"details",
//            	            		})
//            	            		var oClock=document.createElement("div");
//            	            		$(oClock).attr({
//            	            			"class":"clock",
//            	            		})
//            	            		$(oClock).text("00:00")
//            	            		var oErase=document.createElement("div");
//            	            		$(oErase).attr({
//            	            			"class":"erase",
//            	            		})
//            	            		$(oDetails).append(oClock)
//            	            		$(oDetails).append(oErase)
//            	            		$(oDiv).append(oP);
//            	            		$(oDiv).append(inputs);
//            	            		$(oDiv).append(oDetails);
//            	            		$(this).append(oi);//判断如果是重要给i添加一个“in”类名；
//            	            		$(this).append(oDiv);
//            	            		
//            	                	$this.on('click','.event-single',function(){
//            	                		$this.find('.add-nr').show();
//            	                		var nr= $(this).children('input').val();
//            	                		$this.find('.add-nr').text(nr);
//            	                		
//            	                	})
//            	            	}
//            	           
//            			    
//            			    
//            			    })
//            
//            		   }
//            		   
//            		   
//            	
//            	   }
//            	 
//            	   
//              }
//		 	});
//            
//            $this.find('.this-month').each(function(){
//            	var str=100;
//            	if($(this).attr('data-date')=='25/6/2017'){
//            		str++;
//            		var oi = document.createElement("i");
// 
//            		var oDiv=document.createElement("div");
//            		$(oDiv).attr({
//            			"class":"event-single",
//            			"data-id":str
//            		})
//            		var oP=document.createElement("p");
//            		$(oP).text("123");
//            		var oDetails =document.createElement("div");
//            		$(oDetails).attr({
//            			"class":"details",
//            		})
//            		var oClock=document.createElement("div");
//            		$(oClock).attr({
//            			"class":"clock",
//            		})
//            		$(oClock).text("00:00")
//            		var oErase=document.createElement("div");
//            		$(oErase).attr({
//            			"class":"erase",
//            		})
//            		$(oDetails).append(oClock)
//            		$(oDetails).append(oErase)
//            		$(oDiv).append(oP);
//            		$(oDiv).append(oDetails);
//            		$(this).append(oi);//判断如果是重要给i添加一个“in”类名；
//            		$(this).append(oDiv);
//            		
//                	$this.on('click','.event-single',function(){
//                		$this.find('.add-nr').show();
//                		var nr= $(this).children('p').text();
//                		$this.find('.add-nr').text(nr);
//                		
//                	})
//            	}
//            })
            $close.on('click', function(){
            	$this.find('.add-nr').hide();
            	$this.find('.even').val("");
                prevAddEvent(); 
            });
            // delete event
            $this.on('click', '.event-single .erase', function(){
                $('div[data-id=' + $(this).parents(".event-single").attr("data-id") + ']').animate({'height': 0}, function(){
                	var listId=$(this).attr("data-id");
                	$.ajax({ 
                		url:"/jrjw/a/sys/index/delgrrc",
                		data:{
                			listId:listId
                		},
                		success:function(boolean){
                			
                			  $(this).remove();
                			  $this.find('.add-nr').hide();
                              $this.find('.add-nr').hide();
                              alert("删除成功");
                		},
                		
                	});
                	$(this).remove();
                    $this.find('.add-nr').hide();
                	calcTotalDayAgain();
                    calcScroll();
                });
            });

        };

    }(jQuery));

});

