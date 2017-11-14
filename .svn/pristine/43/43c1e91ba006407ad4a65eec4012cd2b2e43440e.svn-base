package com.zzx.test.number.service.impl;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Random;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.zzx.sys.control.util.MyException;
import com.zzx.test.number.service.SysNumberService;

/**
* @author 郑志欣
* @date 2017年8月24日
*/
@Service
public class SysNumberServiceImpl implements SysNumberService{

	@Override
	public void create(String name, int number) throws MyException {
		try {
			StringBuffer filepath=new StringBuffer("D:\\number\\");
			StringBuffer filename=new StringBuffer(name+".txt");
			filepath.append(filename);
			File file=new File(filepath.toString());
			
			if(file.isFile() && file.exists()){
				InputStreamReader read=new InputStreamReader(new FileInputStream(file),"utf-8");
				BufferedReader bf=new BufferedReader(read);
				String content=bf.readLine();
				String[] page=content.split(" ");
				Set<String> set=new HashSet<String>();
				StringBuffer[] result=new StringBuffer[number];
				
				//生成四位随机数
				while(set.size()<number) {
					Random random=new Random();
					String fourRandom=random.nextInt(10000)+"";
					int ranLength=fourRandom.length();
					//补全四位数字
					if(ranLength<4) {
						for(int j=1;j<=4-ranLength;j++) {
							fourRandom="0"+fourRandom;
						}
					}
					//防止重复
					set.add(fourRandom);
				}
				
				Iterator<String> it=set.iterator();
				while (it.hasNext()) {
					for (int k = 0; k < number; k++) {
						result[k]=new StringBuffer();
						int pig=(int)(Math.random()*page.length);
						result[k].append(page[pig]);
						result[k].append(it.next());
					}
				}
				
				FileWriter out=new FileWriter("D:\\test.txt");
				BufferedWriter bw=new BufferedWriter(out);
				for (int i = 0; i < result.length; i++) {
					bw.write(result[i].toString());
					bw.write("\r\n");
				}
				
				bw.close();
				out.close();
				read.close();
				bf.close();
			}else {
				throw new MyException("文件不存在");
			}
		} catch (Exception e) {
			throw new MyException("生成号码出错");
		}
	}

}
