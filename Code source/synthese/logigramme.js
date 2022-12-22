function logigramme(s)
{s="A.B'.C'.D'.E'.F'.G'+A'.B.C'.D.E'.F'.G'+A'.B'.C.D'.E.F.G'+A'.B'.C.D'.E.F'G.+A.B'.C'.D.E.F'.G'+A.B'.C.D'.E'.F.G+A.B'.C.D.E.F'.G+A'.B.C'.D'.E.G+A'.B.C.D'.E'.F+A.B.C'.D'.E'.G+A'.B'.C.D.F.G+A'.B.C'.D.F.G+A'.B.C.D.F.G'+A'.B.C.D.E.F"
    let ix=-1000;
    let iy=-1000;
    let xi=ix;
    let yi=iy;
    let or=false;
    let result='{ "class": "go.GraphLinksModel","linkFromPortIdProperty":"fromPort","linkToPortIdProperty":"toPort","nodeDataArray":['
    let andg=1;
    let org=1;
    let not=0
    let x=[]
    let y=[]
    let tab=[]
    tab.length=26
    const pas=10
    let here=true
    for(let i=0;i<s.length;i++)
    {
        if(s[i]>='A' && s[i]<='Z' || s[i]>='a' && s[i]<='z')
        {
            tab[(s[i].charCodeAt()-'A'.charCodeAt())]=1
        }
    }
    for(let i=0;i<tab.length;i++)
    {
        if(tab[i]==1)
        {
            result+='{"category":"input","key":"'
            result+=String.fromCharCode("A".charCodeAt()+i)+'","loc":"'+(xi-500)+' '+(yi-100)+'"},'
            yi+=100
            xi-=30
        }
    }
    yi=iy
    xi=ix
    //Construction des portes logiques(leur positionnement)
    for(let i=0;i<s.length;i++)
    {
        if(s[i]=='.')
        {
            result+='{"category":"and","key":"and'+andg+'","loc":"'+xi+' '+yi+'"}'
            if(i+2<s.length || or)result+=','
            xi+=300
            andg++;
        }
        else
        {
            if(s[i]=='+')
            {
                x.push(xi-300);
                y.push(yi)
                if(or)
                {
                    result+='{"category":"or", "key":"or'+org+'","loc":"'+(Math.max(x[0],x[1])+100)+' '+((y[0]+y[1])/2+30)+'"},'
                    org++;
                    x.splice(0,1)
                    y.splice(0,1)
                }
                xi=ix;
                yi+=200
                or=true
                here=true
            }
            else
            {
                if(s[i]=='\'')
                {
                    if(i-2>=0 && s[i-2]=='+')
                    {
                        result+='{"category":"not","key":"not'+not+'","loc":"'+(xi-300)+' '+(yi-50)+'"}'
                    }
                    else
                    {
                        if(i-2>=0 && s[i-2]=='.')
                        {
                            if(here)
                            {
                                result+='{"category":"not","key":"not'+not+'","loc":"'+(xi-450)+' '+(yi-pas+50)+'"}'
                                here=false
                            }
                            else
                            {
                                here=true
                                result+='{"category":"not","key":"not'+not+'","loc":"'+(xi-450)+' '+(yi+50)+'"}'
                            }
                        }
                        else
                        {
                            if(i-2<0 && i+1<s.length)
                            {
                                if(s[i+1]=='.')
                                {
                                    result+='{"category":"not","key":"not'+not+'","loc":"'+(xi-150)+' '+(yi-50)+'"}'
                                }
                                else
                                {
                                    if(s[i+1]=='+')
                                    {
                                        result+='{"category":"not","key":"not'+not+'","loc":"'+(xi-300)+' '+(yi-50)+'"}'
                                    }
                                }
                            }
                        }   
                    }
                 if(i+2<s.length || or)result+=','
                    not++
                }
            }
        }
    }
    if(or)
    {
        x.push(xi-300);
        y.push(yi)
        result+='{"category":"or", "key":"or'+org+'","loc":"'+(Math.max(x[0],x[1])+100)+' '+((y[0]+y[1])/2+30)+'"},'
        result+='{"category":"output", "key":"output1'+'","loc":"'+(Math.max(x[0],x[1])+200)+' '+((y[0]+y[1])/2+30)+'"}'
        x=[]
        y=[]
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    else
    {
        if(andg>1 || not>0)result+=','
        result+='{"category":"output", "key":"output1'+'","loc":"'+xi+' '+yi+'"}'
    }
    //Faire les liaisons entre les portes
    result+=']'
    result+=',"linkDataArray":['
    let firstand=true;
    let firstor=true;
    let ngates=0
    let rgates=0
    not=0
    for(let i=0;i<s.length;i++) //the input
    {
        if(s[i]=='+' || s[i]=='.' || s[i]=='\'')
        {
            if(s[i]=='\'')
            {
                result+='{"from":"'
                result+=s[i-1]
                result+='","fromPort":"out","to":"not'+(not)+'","toPort":"in"},'
                not++
            }
            else
            {
                if(s[i]=='.')
                {
                    if(i-2>=0)
                    {
                        if(s[i-2]=='+')
                        {
                            result+='{"from":"'
                            result+=s[i-1]
                            result+='","fromPort":"out","to":"and'+(ngates+1)+'","toPort":"in1"},'
                        }
                        else
                        {
                            if(s[i-2]=='.')
                            {
                                result+='{"from":"'
                                result+=s[i-1]
                                result+='","fromPort":"out","to":"and'+(ngates)+'","toPort":"in2"},'
                            }
                        }
                    }
                    else
                    {
                            result+='{"from":"'
                            result+=s[i-1]
                            result+='","fromPort":"out","to":"and'+(ngates+1)+'","toPort":"in1"},'
                    }
                    ngates++
                }
                else
                {
                    if(s[i]=='+')
                    {
                        if(i-2>=0)
                        {
                            if(s[i-2]=='.')
                            {
                                result+='{"from":"'
                                result+=s[i-1]
                                result+='","fromPort":"out","to":"and'+(ngates)+'","toPort":"in2"},'

                            }
                            else
                            {
                                if(s[i-2]=='+')
                                {
                                    result+='{"from":"'
                                    result+=s[i-1]
                                    result+='","fromPort":"out","to":"or'+(rgates)+'","toPort":"in2"},'
                                }
                            }
                        }
                        else
                        {
                                    result+='{"from":"'
                                    result+=s[i-1]
                                    result+='","fromPort":"out","to":"or'+(rgates+1)+'","toPort":"in1"},'

                        }
                        rgates++
                    }
                }
            }
        }
    }
if(s.length-2>0 && s[s.length-2]=='+' || s[s.length-2]=='.')
{
  if(s[s.length-2]=='+')
   {
    result+='{"from":"'
    result+=s[s.length-1]
    result+='","fromPort":"out","to":"or'+(rgates)+'","toPort":"in2"},'
    }
   else if(s[s.length-2]=='.')
  {
    result+='{"from":"'
    result+=s[s.length-1]
    result+='","fromPort":"out","to":"and'+(ngates)+'","toPort":"in2"},'
  }
}
    ngates=0
    rgates=1
    not=0
    for(let i=0;i<s.length;i++)
    {
        if(s[i]=='.')
        {
            if(!firstand)
            {
                result+='{"from":"and'+ngates+'","fromPort":"out","to":"and'+(ngates+1)+'","toPort":"in1"},'
            }
            else
            firstand=false
            ngates++
        }
        else
        {
            if(s[i]=='+')
            {
                if(!firstor)
                {
                    if(ngates>0 && !firstand)result+='{"from":"and'+ngates+'","fromPort":"out","to":"or'+rgates+'","toPort":"in2"},'
                    rgates++
                }
                else
                {
                    if(ngates>0 && !firstand)result+='{"from":"and'+ngates+'","fromPort":"out","to":"or'+rgates+'","toPort":"in1"},'
                    firstor=false
                }
                firstand=true
            }
            else
            {
                if(s[i]=='\'')
                {
                    result+='{"from":"not'+not+'","fromPort":"out","to":'
                    if(i-2>=0)
                    {
                        if(s[i-2]=='.')
                        {
                            //join avec and
                            result+='"and'+(ngates)+'","toPort":"in2"},'
                        }
                        else
                        {
                            if(s[i-2]=='+')
                            {
                                if(i+1<s.length)
                                {
                                    if(s[i+1]=='+')
                                    {
                                        //join avec ou
                                        result+='"or'+(rgates)+'","toPort":"in2"},'

                                    }
                                    else
                                    {
                                        if(s[i+1]=='.')
                                        {
                                            //join avec and+1
                                            result+='"and'+(ngates+1)+'","toPort":"in1"},'
                                        }
                                    }
                                }
                                else
                                {
                                    //join avec ou 
                                    result+='"or'+(rgates)+'","toPort":"in2"},'
                                }
                            }
                        }

                    }
                    else
                    {
                        if(i+1<s.length)
                        {
                            if(s[i+1]=='+')
                            {
                                //join avec ou
                                result+='"or'+(rgates)+'","toPort":"in1"},'
                            }
                            else
                            {
                                if(s[i+1]=='.')
                                {
                                    //join avec and+1
                                    result+='"and'+(ngates+1)+'","toPort":"in1"},'

                                }
                            }

                        }
                        else
                        {
                            result+='"output1","toPort":""}'
                        }
                    }
                    not ++
                }
            }
        }
    }
    let orgates=1
    while(orgates<org)
    {
        result+='{"from":"or'+orgates+'","fromPort":"out","to":"or'+(orgates+1)+'","toPort":"in1"},'
        orgates++;
    }
    if(!firstor)
    {
        result+='{"from":"or'+orgates+'","fromPort":"out","to":"output1'+'","toPort":""}'
        if(!firstand)result+=',{"from":"and'+ngates+'","fromPort":"out","to":"or'+org+'","toPort":"in2"}'
    }
    else
    {
        if(!firstand)result+='{"from":"and'+ngates+'","fromPort":"out","to":"output1'+'","toPort":""}'
    }
    result+=']}'
    return result
}
//console.log(logigramme("B+C"))

function fillTextArea() {
    let text=logigramme("A.B.C.D.E.F.G + A.B.C.D.E.F.G")    
    document.getElementById("mySavedModel").innerHTML= text
}
