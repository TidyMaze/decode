# decode

Given a book:
- picks an sample
- generates a dictionary (mapping between letter and ciphered letter)
- encodes the sample using dictionary
- analyses the entire book to get language probabilities (if current letter is X, what is the probability that next is Y)
- tries to find (from scratch) a dictionary to decode the encoded sample, using pseudo-genetic algorithm (pool of dictionaries with incremental swapping)
- result is the decoded sample

```
raw text =  the dormouse very ill alice tried to fancy to herself what such an extraordinary ways of living would be like but it puzzled her too much so she went on but why did they live at the bottom of a well take some more tea the march hare said to alice very earnestly ive had nothing yet alice replied in an offended tone so i cant take more you mean you cant take less said the hatter its very easy to take more than nothing nobody asked your opinion said alice whos making personal remarks now the hatter asked triumphantly alice did not quite know what to say to this so she helped herself to some tea and breadandbutter and then turned to the dormouse and repeated her question why did they live at the bottom of a well the dormouse again took a minute or two to think about it and then said it was a treaclewell theres no such thing alice was beginning very angrily but the hatter and the march hare went sh sh and the dormouse sulkily remarked if you cant be civil youd better finish the story for yourself no please go on alice said very humbly i wont interrupt again i dare say there may be one one indeed said the dormouse indignantly however he consented to go on and so these three little sistersthey were learning to draw you know what did they draw said alice quite forgetting her promise treacle said the dormouse without considering at all this time i want a clean cup interrupted the hatter lets all move one place on he moved on as he spoke and the dormouse followed him the march hare moved into the dormouses place and alice rather unwillingly took the place of the march hare the hatter was the only one who got any advantage from the change and alice was a good deal worse off than before as the march hare had just upset the milkjug into his plate alice did not wish to offend the dormouse again so she began very cautiously but i dont understand where did they draw the treacle from you can draw water out of a waterwell said the hatter so i should think you could draw treacle out  1.3%
dict = h,c,g,w,q,d,a,m,x,v,z,j,r,b,i,l,n,u,k, ,p,t,o,y,e,f,s
encoded text = s mqswiuripkqstquesxjjshjxgqs uxqws isdhbges ismqukqjdsomh skpgmshbsqy uhiuwxbhu[...]
Gen 0 best chromosome y,h,w,t,d,x,a,s,i,c,j,v,f,o,g, ,p,n,e,q,k,b,r,u,m,l,z => ezfperikni jpeqpkdeuccescuapezkuprezietshadeziefpkjpctegfszej afeshepmzksikruhsk[...] score = 0.063 vs perfect 0.172
Gen 1 best chromosome y,h,w,t,c,x,a,s,i,d,j,v,f,o,g, ,p,n,e,q,k,b,r,u,m,l,z => ezfperikni jpeqpkceuddesduapezkuprezietshaceziefpkjpdtegfszej afeshepmzksikruhsk[...] score = 0.064 vs perfect 0.172
Gen 3 best chromosome y,h,w,t,c,o,a,s,i,d,j,v,f,x,g, ,p,n,e,q,k,b,r,u,m,l,z => ezfperikni jpeqpkceuddesduapezkuprezietshaceziefpkjpdtegfszej afeshepmzksikruhsk[...] score = 0.064 vs perfect 0.172
Gen 4 best chromosome i,o,l,q,p,x,c,g,b,t,y,n,d,w,z,h,k,s, ,m,e,v,u,j,r,a,f =>  fdk ubesbhyk mkep jtt gtjck fejku fb qgocp fb dkeyktq zdgf yhcd go krfegbeujoge[...] score = 0.079 vs perfect 0.172
Gen 11 best chromosome d,o,l,q,p,x,c,g,b,t,y,n,i,w,z,h,k,s, ,m,e,v,u,j,r,a,f =>  fik ubesbhyk mkep jtt gtjck fejku fb qgocp fb ikeyktq zigf yhci go krfegbeujoge[...] score = 0.082 vs perfect 0.172
Gen 15 best chromosome d,o,l,x,p,q,c,g,b,t,y,n,i,w,z,h,k,s, ,m,e,v,u,j,r,a,f =>  fik ubesbhyk mkep jtt gtjck fejku fb xgocp fb ikeyktx zigf yhci go krfegbeujoge[...] score = 0.083 vs perfect 0.172
Gen 16 best chromosome d,o,l,x,p,q,c,n,b,t,y,g,i,w,z,h,k,s, ,m,e,v,u,j,r,a,f =>  fik ubesbhyk mkep jtt ntjck fejku fb xnocp fb ikeyktx zinf yhci no krfenbeujone[...] score = 0.086 vs perfect 0.172
Gen 27 best chromosome d,o,l,x,p,q,c,n,b,t,y,g,i,w,r,h,k,s, ,m,e,v,u,j,z,a,f =>  fik ubesbhyk mkep jtt ntjck fejku fb xnocp fb ikeyktx rinf yhci no kzfenbeujone[...] score = 0.087 vs perfect 0.172
Gen 36 best chromosome d,o,l,x,p,j,c,n,b,t,y,g,i,w,r,h,k,s, ,m,e,v,u,q,z,a,f =>  fik ubesbhyk mkep qtt ntqck feqku fb xnocp fb ikeyktx rinf yhci no kzfenbeuqone[...] score = 0.091 vs perfect 0.172
Gen 39 best chromosome d,o,l,x,p,z,c,n,b,t,y,g,i,w,r,h,k,s, ,m,e,v,u,q,j,a,f =>  fik ubesbhyk mkep qtt ntqck feqku fb xnocp fb ikeyktx rinf yhci no kjfenbeuqone[...] score = 0.091 vs perfect 0.172
Gen 40 best chromosome d,o,t,x,p,z,c,n,b,l,y,g,i,w,r,h,k,s, ,m,e,v,u,q,j,a,f =>  fik ubesbhyk mkep qll nlqck feqku fb xnocp fb ikeyklx rinf yhci no kjfenbeuqone[...] score = 0.091 vs perfect 0.172
Gen 53 best chromosome z,b,g,t,c,i,s,a,o,q,j,v,y,x,k,w, ,n,e,l,m,d,r,u,p,f,h => ehy eromnowj el mceuqqeaqus ehmu rehoetabscehoey mj qtekyahejwsyeabe phmaomrubam[...] score = 0.094 vs perfect 0.172
Gen 56 best chromosome z,b,l,t,c,i,s,a,o,q,j,v,y,x,k,w, ,n,e,g,m,d,r,u,p,f,h => ehy eromnowj eg mceuqqeaqus ehmu rehoetabscehoey mj qtekyahejwsyeabe phmaomrubam[...] score = 0.095 vs perfect 0.172
Gen 58 best chromosome z,c,l,t,b,i,s,a,o,q,j,v,y,x,k,w, ,n,e,g,m,d,r,u,p,f,h => ehy eromnowj eg mbeuqqeaqus ehmu rehoetacsbehoey mj qtekyahejwsyeace phmaomrucam[...] score = 0.097 vs perfect 0.172
Gen 60 best chromosome v,c,l,t,b,i,s,a,o,q,j,z,y,x,k,w, ,n,e,g,m,d,r,u,p,f,h => ehy eromnowj eg mbeuqqeaqus ehmu rehoetacsbehoey mj qtekyahejwsyeace phmaomrucam[...] score = 0.099 vs perfect 0.172
Gen 61 best chromosome d,o,n,x,p,z,c,t,g,l,y,b,i,w,r,h,e,s, ,m,k,v,u,q,j,a,f =>  fie ugksghye mekp qll tlqce fkqeu fg xtocp fg iekyelx ritf yhci to ejfktgkuqotk[...] score = 0.102 vs perfect 0.172
Gen 62 best chromosome d,o,n,x,p,z,c,t,g,l,y,b,i,w,k,h,e,s, ,m,r,v,u,q,j,a,f =>  fie ugrsghye merp qll tlqce frqeu fg xtocp fg ieryelx kitf yhci to ejfrtgruqotr[...] score = 0.105 vs perfect 0.172
Gen 63 best chromosome y,t,z,o,s,m,l,x,h,e,p,v,u,i,a,b,d,w, ,k,n,f,c,r,j,g,q =>  qud chnwhbpd kdns ree xerld qnrdc qh oxtls qh udnpdeo auxq pblu xt djqnxhncrtxn[...] score = 0.113 vs perfect 0.172
Gen 66 best chromosome p,t,z,o,s,m,l,x,h,e,y,v,u,i,a,b,d,w, ,k,n,f,c,r,j,g,q =>  qud chnwhbyd kdns ree xerld qnrdc qh oxtls qh udnydeo auxq yblu xt djqnxhncrtxn[...] score = 0.114 vs perfect 0.172
Gen 83 best chromosome p,t,z,o,s,m,l,x,h,c,y,v,u,i,a,b,d,w, ,k,n,f,e,r,j,g,q =>  qud ehnwhbyd kdns rcc xcrld qnrde qh oxtls qh udnydco auxq yblu xt djqnxhnertxn[...] score = 0.119 vs perfect 0.172
Gen 88 best chromosome p,t,z,o,s,m,l,x,h,r,y,v,u,i,a,b,d,w, ,k,n,f,e,c,j,g,q =>  qud ehnwhbyd kdns crr xrcld qncde qh oxtls qh udnydro auxq yblu xt djqnxhnectxn[...] score = 0.120 vs perfect 0.172
Gen 89 best chromosome p,t,z,o,s,m,l,x,h,r,y,i,u,v,a,b,d,w, ,k,n,f,e,c,j,g,q =>  qud ehnwhbyd kdns crr xrcld qncde qh oxtls qh udnydro auxq yblu xt djqnxhnectxn[...] score = 0.121 vs perfect 0.172
Gen 93 best chromosome p,t,z,o,s,m,l,x,h,r,y,b,u,v,a,i,d,w, ,k,n,f,e,c,j,g,q =>  qud ehnwhiyd kdns crr xrcld qncde qh oxtls qh udnydro auxq yilu xt djqnxhnectxn[...] score = 0.123 vs perfect 0.172
Gen 121 best chromosome p,t,z,o,s,m,l,x,h,r,e,b,u,v,a,i,d,w, ,k,n,f,y,c,j,g,q =>  qud yhnwhied kdns crr xrcld qncdy qh oxtls qh udnedro auxq eilu xt djqnxhnyctxn[...] score = 0.125 vs perfect 0.172
Gen 130 best chromosome p,t,z,o,s,m,l,x,h,e,r,b,u,v,a,i,d,w, ,k,n,f,y,c,j,g,q =>  qud yhnwhird kdns cee xecld qncdy qh oxtls qh udnrdeo auxq rilu xt djqnxhnyctxn[...] score = 0.126 vs perfect 0.172
Gen 135 best chromosome p,t,z,o,s,m,l,x,f,e,r,b,u,v,a,i,d,w, ,k,n,h,y,c,j,g,q =>  qud yfnwfird kdns cee xecld qncdy qf oxtls qf udnrdeo auxq rilu xt djqnxfnyctxn[...] score = 0.126 vs perfect 0.172
Gen 152 best chromosome p,t,l,o,s,m,z,x,f,e,r,b,u,v,a,i,d,w, ,k,n,h,y,c,j,g,q =>  qud yfnwfird kdns cee xeczd qncdy qf oxtzs qf udnrdeo auxq rizu xt djqnxfnyctxn[...] score = 0.126 vs perfect 0.172
Gen 156 best chromosome p,t,l,o,f,m,z,x,s,e,r,b,u,v,a,i,d,w, ,k,n,h,y,c,j,g,q =>  qud ysnwsird kdnf cee xeczd qncdy qs oxtzf qs udnrdeo auxq rizu xt djqnxsnyctxn[...] score = 0.127 vs perfect 0.172
Gen 161 best chromosome p,t,l,o,f,z,m,x,s,e,r,b,u,v,a,i,d,w, ,k,n,h,y,c,j,g,q =>  qud ysnwsird kdnf cee xecmd qncdy qs oxtmf qs udnrdeo auxq rimu xt djqnxsnyctxn[...] score = 0.127 vs perfect 0.172
Gen 167 best chromosome p,t,l,o,f,z,m,i,s,e,r,b,u,v,a,x,d,w, ,k,n,h,y,c,j,g,q =>  qud ysnwsxrd kdnf cee iecmd qncdy qs oitmf qs udnrdeo auiq rxmu it djqnisnyctin[...] score = 0.129 vs perfect 0.172
Gen 169 best chromosome p,t,w,o,f,z,m,i,s,e,r,b,u,v,a,x,d,l, ,k,n,h,y,c,j,g,q =>  qud ysnlsxrd kdnf cee iecmd qncdy qs oitmf qs udnrdeo auiq rxmu it djqnisnyctin[...] score = 0.130 vs perfect 0.172
Gen 172 best chromosome p,t,w,o,f,v,m,i,s,e,r,b,u,z,a,x,d,l, ,k,n,h,y,c,j,g,q =>  qud ysnlsxrd kdnf cee iecmd qncdy qs oitmf qs udnrdeo auiq rxmu it djqnisnyctin[...] score = 0.130 vs perfect 0.172
Gen 186 best chromosome x,t,w,o,f,v,m,i,s,e,r,b,u,z,a,p,d,l, ,k,n,h,y,c,j,g,q =>  qud ysnlsprd kdnf cee iecmd qncdy qs oitmf qs udnrdeo auiq rpmu it djqnisnyctin[...] score = 0.131 vs perfect 0.172
Gen 193 best chromosome k,y,c,f,g,p,j,u,o,z,q,x,v,m,b,d,e,a, ,h,n,w,s,l,i,r,t =>  tve sonaodqe heng lzz uzlje tnles to fuyjg to venqezf bvut qdjv uy eitnuonslyun[...] score = 0.132 vs perfect 0.172
Gen 194 best chromosome k,y,c,f,g,p,j,u,o,z,q,x,v,m,b,d,e,w, ,h,n,a,s,l,i,r,t =>  tve sonwodqe heng lzz uzlje tnles to fuyjg to venqezf bvut qdjv uy eitnuonslyun[...] score = 0.132 vs perfect 0.172
Gen 223 best chromosome x,t,w,m,f,b,o,i,s,e,k,v,u,z,a,p,d,l, ,r,n,h,y,c,j,g,q =>  qud ysnlspkd rdnf cee iecod qncdy qs mitof qs udnkdem auiq kpou it djqnisnyctin[...] score = 0.132 vs perfect 0.172
Gen 227 best chromosome x,t,w,m,f,b,o,i,s,e,k,v,u,z,a,h,d,l, ,r,n,p,y,c,j,g,q =>  qud ysnlshkd rdnf cee iecod qncdy qs mitof qs udnkdem auiq khou it djqnisnyctin[...] score = 0.135 vs perfect 0.172
Gen 229 best chromosome x,t,w,m,f,b,o,i,s,e,k,v,u,z,a,h,d,g, ,r,n,p,y,c,j,l,q =>  qud ysngshkd rdnf cee iecod qncdy qs mitof qs udnkdem auiq khou it djqnisnyctin[...] score = 0.135 vs perfect 0.172
Gen 288 best chromosome x,t,w,m,f,b,o,i,s,e,g,v,u,z,a,h,d,k, ,r,n,p,y,c,j,l,q =>  qud ysnkshgd rdnf cee iecod qncdy qs mitof qs udngdem auiq ghou it djqnisnyctin[...] score = 0.136 vs perfect 0.172
Gen 309 best chromosome y,o,w,k,g,l,c,t,q,h,m,p,j,i,a,u,e,x, ,v,r,b,d,f,n,z,s =>  sje dqrxqume verg fhh thfce srfed sq ktocg sq jermehk ajts mucj to ensrtqrdfotr[...] score = 0.136 vs perfect 0.172
Gen 319 best chromosome f,y,c,g,d,p,j,u,o,z,q,x,v,m,b,n,e,w, ,h,k,a,s,l,i,r,t =>  tve sokwonqe hekd lzz uzlje tkles to guyjd to vekqezg bvut qnjv uy eitkuokslyuk[...] score = 0.137 vs perfect 0.172
Gen 324 best chromosome f,y,c,g,d,p,j,u,o,z,q,x,v,i,b,n,e,w, ,h,k,a,s,l,m,r,t =>  tve sokwonqe hekd lzz uzlje tkles to guyjd to vekqezg bvut qnjv uy emtkuokslyuk[...] score = 0.137 vs perfect 0.172
Gen 327 best chromosome f,y,c,g,d,p,j,u,o,z,w,x,v,i,b,n,e,q, ,h,k,a,s,l,m,r,t =>  tve sokqonwe hekd lzz uzlje tkles to guyjd to vekwezg bvut wnjv uy emtkuokslyuk[...] score = 0.138 vs perfect 0.172
Gen 345 best chromosome f,y,c,g,d,p,j,u,o,z,h,x,v,i,b,n,e,q, ,w,k,a,s,l,m,r,t =>  tve sokqonhe wekd lzz uzlje tkles to guyjd to vekhezg bvut hnjv uy emtkuokslyuk[...] score = 0.139 vs perfect 0.172
Gen 374 best chromosome f,y,c,g,d,p,j,u,o,z,h,m,v,i,b,n,e,q, ,w,k,a,s,l,x,r,t =>  tve sokqonhe wekd lzz uzlje tkles to guyjd to vekhezg bvut hnjv uy extkuokslyuk[...] score = 0.139 vs perfect 0.172
Gen 379 best chromosome f,y,c,g,d,p,j,u,o,z,h,m,v,i,w,n,e,q, ,b,k,a,s,l,x,r,t =>  tve sokqonhe bekd lzz uzlje tkles to guyjd to vekhezg wvut hnjv uy extkuokslyuk[...] score = 0.140 vs perfect 0.172
Gen 391 best chromosome f,y,c,g,d,p,j,u,o,z,k,m,v,i,w,n,e,q, ,b,h,a,s,l,x,r,t =>  tve sohqonke behd lzz uzlje thles to guyjd to vehkezg wvut knjv uy exthuohslyuh[...] score = 0.141 vs perfect 0.172
Gen 403 best chromosome g,y,c,f,d,p,j,u,o,z,k,m,v,i,w,n,e,q, ,b,h,a,s,l,x,r,t =>  tve sohqonke behd lzz uzlje thles to fuyjd to vehkezf wvut knjv uy exthuohslyuh[...] score = 0.141 vs perfect 0.172
Gen 424 best chromosome g,d,c,f,y,p,j,u,o,z,k,m,v,i,w,n,e,q, ,b,h,a,s,l,x,r,t =>  tve sohqonke behy lzz uzlje thles to fudjy to vehkezf wvut knjv ud exthuohslduh[...] score = 0.141 vs perfect 0.172
Gen 465 best chromosome g,d,c,f,y,p,j,u,o,z,k,m,v,l,w,n,e,q, ,b,h,a,s,i,x,r,t =>  tve sohqonke behy izz uzije thies to fudjy to vehkezf wvut knjv ud exthuohsiduh[...] score = 0.143 vs perfect 0.172
Gen 489 best chromosome g,d,c,f,y,p,j,u,o,z,r,m,v,l,w,n,e,q, ,b,h,a,s,i,x,k,t =>  tve sohqonre behy izz uzije thies to fudjy to vehrezf wvut rnjv ud exthuohsiduh[...] score = 0.144 vs perfect 0.172
Gen 497 best chromosome g,d,c,f,y,l,j,u,o,z,r,m,v,p,w,n,e,q, ,b,h,a,s,i,x,k,t =>  tve sohqonre behy izz uzije thies to fudjy to vehrezf wvut rnjv ud exthuohsiduh[...] score = 0.144 vs perfect 0.172
Gen 593 best chromosome g,d,c,f,y,l,j,u,o,z,r,m,v,a,w,n,e,q, ,b,h,p,s,i,x,k,t =>  tve sohqonre behy izz uzije thies to fudjy to vehrezf wvut rnjv ud exthuohsiduh[...] score = 0.144 vs perfect 0.172
Gen 595 best chromosome g,d,c,f,s,l,j,u,o,z,r,m,v,a,w,n,e,q, ,b,h,p,y,i,x,k,t =>  tve yohqonre behs izz uzije thiey to fudjs to vehrezf wvut rnjv ud exthuohyiduh[...] score = 0.144 vs perfect 0.172
Gen 603 best chromosome g,n,c,f,s,l,j,u,o,z,r,m,v,a,w,d,e,q, ,b,h,p,y,i,x,k,t =>  tve yohqodre behs izz uzije thiey to funjs to vehrezf wvut rdjv un exthuohyinuh[...] score = 0.145 vs perfect 0.172
Gen 612 best chromosome f,o,b,y,g,l,c,s,q,r,k,p,h,i,x,u,e,a, ,j,v,w,d,m,n,z,t =>  the dqvaquke jevg mrr srmce tvmed tq ysocg tq hevkery xhst kuch so entvsqvdmosv[...] score = 0.145 vs perfect 0.172
Gen 613 best chromosome g,n,c,s,f,l,j,u,o,z,r,m,v,a,w,d,e,q, ,b,h,p,y,i,x,k,t =>  tve yohqodre behf izz uzije thiey to sunjf to vehrezs wvut rdjv un exthuohyinuh[...] score = 0.145 vs perfect 0.172
Gen 630 best chromosome g,n,c,s,d,l,j,u,o,z,r,m,v,a,w,f,e,q, ,b,h,p,y,i,x,k,t =>  tve yohqofre behd izz uzije thiey to sunjd to vehrezs wvut rfjv un exthuohyinuh[...] score = 0.149 vs perfect 0.172
Gen 653 best chromosome g,n,c,s,d,l,j,u,o,z,r,w,v,a,m,f,e,q, ,b,h,p,y,i,x,k,t =>  tve yohqofre behd izz uzije thiey to sunjd to vehrezs mvut rfjv un exthuohyinuh[...] score = 0.149 vs perfect 0.172
Gen 688 best chromosome g,n,c,s,d,l,j,u,o,z,r,a,v,w,m,f,e,q, ,b,h,p,y,i,x,k,t =>  tve yohqofre behd izz uzije thiey to sunjd to vehrezs mvut rfjv un exthuohyinuh[...] score = 0.150 vs perfect 0.172
Gen 713 best chromosome y,l,b,g,f,x,c,s,q,r,k,p,h,o,m,u,e,i, ,j,v,w,d,a,n,z,t =>  the dqviquke jevf arr srace tvaed tq gslcf tq hevkerg mhst kuch sl entvsqvdalsv[...] score = 0.150 vs perfect 0.172
Gen 721 best chromosome y,n,b,g,f,x,c,s,q,r,k,p,h,o,m,u,e,i, ,j,v,w,d,a,l,z,t =>  the dqviquke jevf arr srace tvaed tq gsncf tq hevkerg mhst kuch sn eltvsqvdansv[...] score = 0.153 vs perfect 0.172
Gen 727 best chromosome y,n,b,g,f,x,c,s,q,r,k,p,h,o,w,u,e,i, ,j,v,m,d,a,l,z,t =>  the dqviquke jevf arr srace tvaed tq gsncf tq hevkerg whst kuch sn eltvsqvdansv[...] score = 0.153 vs perfect 0.172
Gen 740 best chromosome y,n,j,g,f,x,c,s,q,r,k,p,h,o,w,u,e,i, ,b,v,m,d,a,l,z,t =>  the dqviquke bevf arr srace tvaed tq gsncf tq hevkerg whst kuch sn eltvsqvdansv[...] score = 0.153 vs perfect 0.172
Gen 766 best chromosome f,n,j,g,y,x,c,s,q,r,k,p,h,o,w,u,e,i, ,b,v,m,d,a,l,z,t =>  the dqviquke bevy arr srace tvaed tq gsncy tq hevkerg whst kuch sn eltvsqvdansv[...] score = 0.156 vs perfect 0.172
Gen 880 best chromosome f,n,j,g,y,x,c,o,q,r,k,p,h,s,w,u,e,i, ,b,v,m,d,a,l,z,t =>  the dqviquke bevy arr orace tvaed tq goncy tq hevkerg whot kuch on eltvoqvdanov[...] score = 0.158 vs perfect 0.172
Gen 916 best chromosome f,n,j,g,y,x,c,o,q,r,k,p,h,w,s,u,e,i, ,b,v,m,d,a,l,z,t =>  the dqviquke bevy arr orace tvaed tq goncy tq hevkerg shot kuch on eltvoqvdanov[...] score = 0.159 vs perfect 0.172
Gen 931 best chromosome f,n,j,g,y,l,c,o,q,r,k,p,h,w,s,u,e,i, ,b,v,m,d,a,x,z,t =>  the dqviquke bevy arr orace tvaed tq goncy tq hevkerg shot kuch on extvoqvdanov[...] score = 0.159 vs perfect 0.172
Gen 938 best chromosome f,n,j,g,y,l,c,o,q,r,k,p,h,w,s,u,e,m, ,b,v,i,d,a,x,z,t =>  the dqvmquke bevy arr orace tvaed tq goncy tq hevkerg shot kuch on extvoqvdanov[...] score = 0.159 vs perfect 0.172
Gen 946 best chromosome f,n,j,g,y,l,c,a,q,r,k,p,h,w,s,u,e,m, ,b,v,i,d,o,x,z,t =>  the dqvmquke bevy orr aroce tvoed tq gancy tq hevkerg shat kuch an extvaqvdonav[...] score = 0.162 vs perfect 0.172
Gen 1037 best chromosome g,n,j,f,y,l,c,a,q,r,k,p,h,w,s,u,e,m, ,b,v,i,d,o,x,z,t =>  the dqvmquke bevy orr aroce tvoed tq fancy tq hevkerf shat kuch an extvaqvdonav[...] score = 0.163 vs perfect 0.172
Gen 1051 best chromosome g,n,j,f,y,l,c,a,q,r,k,p,h,w,s,u,e,m, ,z,v,i,d,o,x,b,t =>  the dqvmquke zevy orr aroce tvoed tq fancy tq hevkerf shat kuch an extvaqvdonav[...] score = 0.163 vs perfect 0.172
Gen 1138 best chromosome g,n,j,f,y,l,c,a,q,r,s,p,h,w,k,u,e,m, ,z,v,i,d,o,x,b,t =>  the dqvmquse zevy orr aroce tvoed tq fancy tq hevserf khat such an extvaqvdonav[...] score = 0.164 vs perfect 0.172
Gen 1241 best chromosome g,n,j,f,y,l,c,a,q,r,s,p,h,k,w,u,e,m, ,z,v,i,d,o,x,b,t =>  the dqvmquse zevy orr aroce tvoed tq fancy tq hevserf what such an extvaqvdonav[...] score = 0.164 vs perfect 0.172
Gen 1507 best chromosome g,n,b,f,y,c,v,a,u,l,j,p,h,m,w,s,e,q, ,z,r,o,d,i,x,k,t =>  the durqusje zery ill alive tried tu fanvy tu herjelf what jsvh an extraurdinar[...] score = 0.165 vs perfect 0.172
Gen 1549 best chromosome g,n,b,f,y,c,v,a,u,l,j,p,h,o,w,s,e,q, ,z,r,m,d,i,x,k,t =>  the durqusje zery ill alive tried tu fanvy tu herjelf what jsvh an extraurdinar[...] score = 0.165 vs perfect 0.172
Gen 1616 best chromosome g,n,j,f,y,l,c,a,q,r,s,p,h,o,w,u,e,m, ,z,v,k,d,i,x,b,t =>  the dqvmquse zevy irr arice tvied tq fancy tq hevserf what such an extvaqvdinav[...] score = 0.168 vs perfect 0.172
Gen 1959 best chromosome g,n,j,f,y,r,c,a,q,l,s,p,h,o,w,u,e,m, ,z,v,k,d,i,x,b,t =>  the dqvmquse zevy ill alice tvied tq fancy tq hevself what such an extvaqvdinav[...] score = 0.168 vs perfect 0.172
Gen 1984 best chromosome g,n,j,f,y,p,c,a,q,l,s,r,h,o,w,u,e,m, ,z,v,k,d,i,x,b,t =>  the dqvmquse zevy ill alice tvied tq fancy tq hevself what such an extvaqvdinav[...] score = 0.168 vs perfect 0.172
Gen 1988 best chromosome g,n,j,f,y,p,c,a,o,l,s,r,h,q,w,u,e,m, ,z,v,k,d,i,x,b,t =>  the dovmouse zevy ill alice tvied to fancy to hevself what such an extvaovdinav[...] score = 0.169 vs perfect 0.172
Gen 2172 best chromosome g,n,j,f,y,p,c,a,o,l,s,b,h,q,w,u,e,m, ,z,v,k,d,i,x,r,t =>  the dovmouse zevy ill alice tvied to fancy to hevself what such an extvaovdinav[...] score = 0.169 vs perfect 0.172
Gen 2173 best chromosome g,n,j,f,y,p,c,a,o,l,s,b,h,q,w,u,e,m, ,z,r,k,d,i,x,v,t =>  the dormouse zery ill alice tried to fancy to herself what such an extraordinar[...] score = 0.171 vs perfect 0.172
Gen 2375 best chromosome g,n,j,f,y,p,c,a,o,l,s,b,h,q,w,u,e,m, ,v,r,k,d,i,x,z,t =>  the dormouse very ill alice tried to fancy to herself what such an extraordinar[...] score = 0.172 vs perfect 0.172
```