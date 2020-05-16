package com.lastpang.server.Controller;

import com.lastpang.server.Domain.Member;
import com.lastpang.server.Domain.Menu;
import com.lastpang.server.Domain.Store;
import com.lastpang.server.Repository.MemberRepository;
import com.lastpang.server.Repository.MenuRepository;
import com.lastpang.server.Repository.StoreRepository;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.*;

@RestController
public class MainController {
    private Logger logger = LoggerFactory.getLogger(ApplicationRunner.class);

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private MenuRepository menuRepository;

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

    @PostMapping(value = "/menu/upload")
    public Map<String, Object> upload(@RequestParam("storename") String storename, @RequestParam("file") MultipartFile multipartFile,
                                      @RequestParam("menuname") String menuname, @RequestParam(value = "price", required = false) Integer price,
                                      @RequestParam(value="desc", required = false) String desc, @RequestParam(value = "options", required = false) String options) {
        UUID uid = UUID.randomUUID();
        File targetFile = new File("src/main/resources/menuimgs/"+uid.toString());
        Menu menu = new Menu();
        System.out.println("actual path is: " + targetFile.getAbsolutePath());
        try {
            System.out.println( multipartFile.getInputStream().getClass());
            InputStream fileStream = multipartFile.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);
            String filename = multipartFile.getOriginalFilename();
            menu.setMenuImgUuid(uid.toString());
            menu.setPrice(price);
            menu.setDescription(desc);
            menu.setStore(storeRepository.findStoreByStoreName(storename));
            menu.setOptions(options);
            menu.setMenuName(menuname);
            menuRepository.save(menu);

        } catch (IOException e) {
            FileUtils.deleteQuietly(targetFile);
            e.printStackTrace();
        }

        Map<String, Object> m = new HashMap<>();
        m.put("errorCode", 10);
        return m;
    }
}
