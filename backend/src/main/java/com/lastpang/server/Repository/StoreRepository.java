package com.lastpang.server.Repository;

import com.lastpang.server.Domain.Store;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends CrudRepository<Store, Long> {

    List<Store> findStoresByMember_UserId(Integer UserId);
    List<Store> findStoresByMember_Username(String username);
    Store findStoreByStoreId (Integer storeId);
    Store findStoreByStoreName(String storeName);
}
