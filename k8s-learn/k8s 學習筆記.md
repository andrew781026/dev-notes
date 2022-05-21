---
title: K8S 學習筆記 (一)
date: 2022-05-17 11:33:42
categories:
- K8S
---

- K8S 學習筆記 (一)

> 此為 udemy 課程 `docker-kubernetes-the-practical-guide` 的上課筆記

187 - First Deployment 

```shell
$ minikube status 

## 錯誤訊息 : PROVIDER_VIRTUALBOX_NOT_FOUND ( minikube 預設 driver = VirtualBox )
* minikube v1.25.2 on Microsoft Windows 10 Home 10.0.19044 Build 19044
* Using the virtualbox driver based on user configuration

* Exiting due to PROVIDER_VIRTUALBOX_NOT_FOUND: The 'virtualbox' provider was not found: unable to find VBoxManage in $PATH
* Suggestion: Install VirtualBox
* Documentation: https://minikube.sigs.k8s.io/docs/reference/drivers/virtualbox/

## 如果 status 顯示 VBoxManage not found 錯誤 , 可執行下面步驟
$ minikube start --delete-on-failure # 刪除無法使用的 VirtualBox cluster
$ minikube start --driver=docker     # 用 docker 啟動 minikube 
$ minikube status                    # 確認 minikube 目前狀態 
```

## 前置作業

- 安裝 kubectl 
- 安裝 minikube ( 啟動 minikube start / 確認狀態 minikube status  )

### kubectl CLI 說明

- docker build . -t kub-first-app   # 利用 Dockerfile 建立 image 
- kubectl help 
- kubectl create deployment first-app --image=kub-first-app  # create a deployment object  
- kubectl get deployments
- kubectl get pods

> ErrImagePull - 找不到目標 Image  

- 在 Docker Hub 建立新的 repository
- docker tag kub-first-app andrew7810262000/kub-first-app
- docker push andrew7810262000/kub-first-app
- kubectl delete deployment first-app
- kubectl create deployment first-app --image=andrew7810262000/kub-first-app

> 在 K8S 外面訪問內部的應用

- Services group Pods with shared IP
- kubectl expose deployment first-app --type=LoadBalancer --port=8080 
- kubectl get services 
- minikube service first-app  # use minikube to get external-IP of first-app

( type = NodePort / ClusterIP / LoadBalancer )

- kubectl scale deployment/first-app --replicas=3  # 將 deployment/first-app 建立三份 & 執行

> Update the deployment

需要追加 version :number 讓 K8S 知道 image 需要抓新的 , 下面用 :2 作範例

- docker build . -t andrew7810262000/kub-first-app:2
- docker push andrew7810262000/kub-first-app:2
- kubectl set image deployment/first-app kub-first-app=andrew7810262000/kub-first-app:2    # 會將 kub-first-app 的 container 改用 image=andrew7810262000/kub-first-app:2 做啟動

> Deployment Rollback & History 
 
- kubectl rollout status deployment/first-app
- kubectl rollout undo deployment/first-app
- kubectl rollout undo deployment/first-app --to-revision=5
- kubectl rollout history deployment/first-app
- kubectl rollout history deployment/first-app --revision=5

> Delete 

- kubectl delete service first-app
- kubectl delete deployment first-app

> kubectl & YAML configuration

- kubectl apply -f="deployment.yaml,service.yaml"
- minikube service second-app-service 
- kubectl delete -f="deployment.yaml,service.yaml"
- kubectl apply -f="master-deployment.yaml"

[kubernetes reference-docs](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.24/#deployment-v1-apps)

> 211 . [K8S Volumes] Create new deployment & service

- docker-compose build 
- docker tag story-app andrew7810262000/kub-story-app
- docker login  # 避免 docker push 被 deny 
- docker push andrew7810262000/kub-story-app
- kubectl apply -f="deployment.yaml"

> 213 . [K8S Volumes] type emptyDir

- docker build . -t "andrew7810262000/kub-story-app:1"
- docker push "andrew7810262000/kub-story-app:1"
- kubectl apply -f="deployment.yaml"

測試 API 新增文字 & 讓其 crash - 結果資料沒有留著 

- curl -X POST -H "Content-Type: application/json" -d '{"text": "很好~~" }' http://localhost:32765/story
- curl http://localhost:32765/story
- curl http://localhost:32765/error

後面要多設定 Volumes 處理這樣的 issue ( add volumeMounts & volume in deployment.yaml )

- minikube mount "D:\test\udemy\k8s-volumn:/data"

NOTE: Windows 要如何使用 hostPath ? 

`volumn type = csi`

一種雲端儲存的中介 ( ex : [Amazon EFS CSI Driver](https://github.com/kubernetes-sigs/aws-efs-csi-driver) )

> 216 . [K8S Volumes] Persistent volume 

Persistent volume  = Pod 關閉後 , 也不會消失的 volume

> 221 . [K8S Volumes] env setting

- docker build . -t andrew7810262000/kub-story-app:2
- docker push andrew7810262000/kub-story-app:2
- kubectl apply -f="deployment.yaml"    # 會將 kub-first-app 的 container 改用 image=andrew7810262000/kub-first-app:2 做啟動

> 226 . [K8S Network] 
 
- CoreDNS : use for kubernetes cluster DNS internal 
- kubectl get namespaces


> 切換不同的 Cluster
 
- kubectl config get-contexts
- kubectl config use-context <context-name>
- kubectl config delete-context <context-name> 

### 使用 digitalocean 的 K8S

- 教學 : https://blogg.itverket.no/how-to-create-digitalocean-droplets-using-doctl-on-windows-2

STEP 1: 先下載 "Download Config File"
STEP 2: 查看下載的 "XXXX-kubeconfig.yaml" 檔案 , 裡面可以看到 Token
STEP 3: doctl auth init -t <your-token>
STEP 4: doctl kubernetes cluster kubeconfig save <cluster-name>



