package com.lastpang.server.Controller;

import com.google.gson.Gson;
import com.lastpang.server.Domain.Member;
import com.lastpang.server.Domain.Store;
import com.lastpang.server.Repository.MemberRepository;
import com.lastpang.server.Repository.StoreRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Method;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@RestController
public class MainController {
    private Logger logger = LoggerFactory.getLogger(ApplicationRunner.class);

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private StoreRepository storeRepository;

    @PostMapping(path="/auth/register")
    public Map<String, Object> addNewUser (@RequestBody Member member) {
        String username = member.getUsername();

        Map<String, Object> map = new HashMap<>();
        logger.info("회원가입요청 아이디: "+username + ", 비번: " + member.getPassword());

        memberRepository.save(member);
        map.put("errorCode", 10);

        return map;
    }

    public static Object convertMapToObject(Map<String,Object> map,Object obj){
        String keyAttribute = null;
        String setMethodString = "set";
        String methodString = null;
        Iterator itr = map.keySet().iterator();

        while(itr.hasNext()){
            keyAttribute = (String) itr.next();
            methodString = setMethodString+keyAttribute.substring(0,1).toUpperCase()+keyAttribute.substring(1);
            Method[] methods = obj.getClass().getDeclaredMethods();
            for(int i=0;i<methods.length;i++){
                //System.out.println(methods[i].getName());
                if(methodString.equals(methods[i].getName())){
                    try{
                        methods[i].invoke(obj, map.get(keyAttribute));
                    }catch(Exception e){
                        //e.printStackTrace();
                    }
                }
            }
        }
        return obj;
    }

    @PostMapping(path="/store/register")
    public Map<String, Object> addNewStore (@RequestBody Store store) {
        String username = store.getUsername();
        String name = store.getStoreName();
        logger.info("가게등록요청 이름: "+name);
        store.setMember(memberRepository.findMemberByUsername(username));
        Map<String, Object> map = new HashMap<>();
        storeRepository.save(store);
        map.put("errorCode", 10);
        return map;
    }
/*
    public Map<String, Object> updateStore(@RequestBody Map<String, Object> m) {
        Store st = storeRepository.findStoreByStoreId((Long)m.get("store_id"));
        st.setLongitude((Float)m.get("longitude"));
        st.setLongitude((Float)m.get("latitude"));

    }
*/
    @PostMapping(path = "/auth/login")
    public Map<String, Object> login(@RequestBody Map<String, String> m) throws Exception {
        Map<String, Object> map = new HashMap<>();
        final String username = m.get("username");
        //logger.info("test input username: " + username);

        Member member = memberRepository.findMemberByUsername(username);
        member.setAccess_dt(new Date());
        memberRepository.save(member);
        map.put("errorCode", 10);
        return map;
    }
}
